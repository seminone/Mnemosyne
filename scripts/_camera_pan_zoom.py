from pathlib import Path
import re

cpath = Path(r"D:\Claude Design\TheBrain 7 (clone) (2026.08.11.)\GUI_to_Electron\src\Cortex.jsx")
tpath = Path(r"D:\Claude Design\TheBrain 7 (clone) (2026.08.11.)\GUI_to_Electron\src\template.jsx")
c = cpath.read_text(encoding="utf-8")
t = tpath.read_text(encoding="utf-8")

# --- State: introduce camera object, keep panX/panY aliases for transition ---
old_state_bit = """    panX: 0, panY: 0, panning: false, panOrigin: null,"""
new_state_bit = """    // fitScale = window fit of 1600x1000 chrome; camera = user pan/zoom on Plex content
    panning: false, panOrigin: null,
    camera: {
      panX: 0,
      panY: 0,
      zoom: 1,           // 0.25 .. 2.5
      history: [],       // stub for Manage Saved Views / macros later: { id, name, panX, panY, zoom, at }
    },"""
if old_state_bit not in c:
    raise SystemExit('pan state bit missing')
c = c.replace(old_state_bit, new_state_bit, 1)

# Camera helpers - insert after getNodeOffset or after onPlexMouseUp block
CAM = r'''
  CAMERA_ZOOM_MIN = 0.25;
  CAMERA_ZOOM_MAX = 2.5;

  getCamera() {
    return this.state.camera || { panX: 0, panY: 0, zoom: 1, history: [] };
  }
  setCamera( partial, pushHistory = false ) {
    this.setState((prev) => {
      const cam = { ...(prev.camera || { panX: 0, panY: 0, zoom: 1, history: [] }), ...partial };
      cam.zoom = Math.min(this.CAMERA_ZOOM_MAX, Math.max(this.CAMERA_ZOOM_MIN, cam.zoom));
      let history = cam.history || [];
      if (pushHistory) {
        const entry = {
          id: 'view_' + Date.now(),
          name: null, // named later via Manage Saved Views…
          panX: cam.panX,
          panY: cam.panY,
          zoom: cam.zoom,
          at: new Date().toISOString(),
          selectedId: prev.selectedId,
        };
        history = [...history, entry].slice(-100); // scalable cap
        cam.history = history;
      }
      return { camera: cam };
    });
  }
  resetCameraView(pushHistory = true) {
    this.setCamera({ panX: 0, panY: 0, zoom: 1 }, pushHistory);
    this.showToast('View reset: active node centered.');
  }
  pushCameraHistorySnapshot() {
    const cam = this.getCamera();
    this.setCamera({ panX: cam.panX, panY: cam.panY, zoom: cam.zoom }, true);
  }
  onPlexWheel(e) {
    // prevent page scroll
    e.preventDefault();
    e.stopPropagation();
    const plex = this.plexRef.current;
    if (!plex) return;
    const cam = this.getCamera();
    const rect = plex.getBoundingClientRect();
    // pointer in plex local CSS pixels (chrome fit-scale already applied by parent)
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const direction = e.deltaY < 0 ? 1 : -1;
    const factor = direction > 0 ? 1.1 : 1 / 1.1;
    const oldZ = cam.zoom || 1;
    const newZ = Math.min(this.CAMERA_ZOOM_MAX, Math.max(this.CAMERA_ZOOM_MIN, oldZ * factor));
    if (Math.abs(newZ - oldZ) < 1e-6) return;

    let panX = cam.panX || 0;
    let panY = cam.panY || 0;
    if (e.shiftKey) {
      // zoom toward viewport center
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const wx = (cx - panX) / oldZ;
      const wy = (cy - panY) / oldZ;
      panX = cx - wx * newZ;
      panY = cy - wy * newZ;
    } else {
      // zoom toward mouse cursor
      const wx = (mx - panX) / oldZ;
      const wy = (my - panY) / oldZ;
      panX = mx - wx * newZ;
      panY = my - wy * newZ;
    }
    this.setCamera({ panX, panY, zoom: newZ }, false);
  }
'''

# Replace pan handlers to use camera
old_pan = """  onPlexMouseDown(e) {
    if (e.button !== 0 && e.button !== 1) return;
    // Ignore when starting on interactive node chrome (dots / thought chips)
    const t = e.target;
    if (t && t.closest && t.closest('[data-plex-node], input, textarea, button')) return;
    if (this.state.dragging || this.state.showCreateChild) return;
    e.preventDefault();
    this.setState({
      panning: true,
      panOrigin: { x: e.clientX, y: e.clientY, panX: this.state.panX, panY: this.state.panY },
    });
  }
  onPlexMouseMove(e) {
    if (!this.state.panning || !this.state.panOrigin) return;
    const scale = this.state.scale || 1;
    const ox = this.state.panOrigin;
    this.setState({
      panX: ox.panX + (e.clientX - ox.x) / scale,
      panY: ox.panY + (e.clientY - ox.y) / scale,
    });
  }
  onPlexMouseUp() {
    if (this.state.panning) this.setState({ panning: false, panOrigin: null });
  }
"""

# Read actual pan handlers from file - may differ slightly
i = c.find("  onPlexMouseDown(e) {")
j = c.find("  selectThought(id) {", i)
if i < 0 or j < 0:
    raise SystemExit(f'pan handlers bounds {i},{j}')
print("replacing pan handlers", i, j)
new_pan = CAM + """
  onPlexMouseDown(e) {
    if (e.button !== 0) return; // left-drag empty canvas only
    const t = e.target;
    if (t && t.closest && t.closest('[data-plex-node], input, textarea, button, .mn-context-menu')) return;
    if (this.state.dragging || this.state.showCreateChild) return;
    e.preventDefault();
    const cam = this.getCamera();
    this.setState({
      panning: true,
      panOrigin: { x: e.clientX, y: e.clientY, panX: cam.panX || 0, panY: cam.panY || 0 },
    });
  }
  onPlexMouseMove(e) {
    if (!this.state.panning || !this.state.panOrigin) return;
    // Parent chrome `scale` is fit-to-window; mouse deltas are in screen px → divide by fit scale
    const fit = this.state.scale || 1;
    const ox = this.state.panOrigin;
    const panX = ox.panX + (e.clientX - ox.x) / fit;
    const panY = ox.panY + (e.clientY - ox.y) / fit;
    this.setCamera({ panX, panY }, false);
  }
  onPlexMouseUp() {
    if (this.state.panning) {
      this.setState({ panning: false, panOrigin: null });
      // snapshot for future Manage Saved Views / reopen (unnamed history stub)
      this.pushCameraHistorySnapshot();
    }
  }
"""
c = c[:i] + new_pan + c[j:]

# View menu: Reset View + keep Manage Saved Views stub
c = c.replace(
    """view: { label: 'View', items: [
      { label: 'Normal', shortcut: 'Ctrl+Shift+1' }, { label: 'Outline', shortcut: 'Ctrl+Shift+2' }, { label: 'Last Expanded', shortcut: 'Ctrl+Shift+3' },
      { divider: true },
      { label: 'Expand All', shortcut: 'Ctrl+=' }, { label: 'Collapse All', shortcut: 'Ctrl+-' }, { label: 'Manage Saved Views…' },
    ]},""",
    """view: { label: 'View', items: [
      { label: 'Normal', shortcut: 'Ctrl+Shift+1' }, { label: 'Outline', shortcut: 'Ctrl+Shift+2' }, { label: 'Last Expanded', shortcut: 'Ctrl+Shift+3' },
      { divider: true },
      { label: 'Expand All', shortcut: 'Ctrl+=' }, { label: 'Collapse All', shortcut: 'Ctrl+-' },
      { divider: true },
      { label: 'Reset View', shortcut: 'Ctrl+0' },
      { label: 'Zoom In', shortcut: 'Ctrl+Shift+=' },
      { label: 'Zoom Out', shortcut: 'Ctrl+Shift+-' },
      { label: 'Manage Saved Views…' },
    ]},""",
    1,
)

# Menu handlers for reset/zoom
old_menu_tail = """          if (it.label === 'Open Notes Window') { this.openNotesWindow(); return; }
          if (it.label === 'Open Thought Window') { this.openThoughtWindow(); return; }
          if (it.label === 'Rename/Edit') { this.openRenameDialog(this.state.selectedId, { activate: false }); return; }
"""
# may vary - search
if "Open Notes Window" in c:
    c = c.replace(
        "if (it.label === 'Open Notes Window') { this.openNotesWindow(); return; }",
        """if (it.label === 'Reset View') { this.resetCameraView(true); this.setState({ openMenu: null, openSubmenu: null }); return; }
          if (it.label === 'Zoom In') { this.zoomBy(1.1, false); this.setState({ openMenu: null, openSubmenu: null }); return; }
          if (it.label === 'Zoom Out') { this.zoomBy(1/1.1, false); this.setState({ openMenu: null, openSubmenu: null }); return; }
          if (it.label === 'Manage Saved Views…') { this.showToast('Manage Saved Views — coming later (camera.history ready).'); this.setState({ openMenu: null, openSubmenu: null }); return; }
          if (it.label === 'Open Notes Window') { this.openNotesWindow(); return; }""",
        1,
    )

# zoomBy helper - add near setCamera if not present
if "zoomBy(" not in c:
    c = c.replace(
        "  resetCameraView(pushHistory = true) {",
        """  zoomBy(factor, towardCenter = false) {
    const cam = this.getCamera();
    const plex = this.plexRef.current;
    if (!plex) {
      this.setCamera({ zoom: (cam.zoom || 1) * factor }, false);
      return;
    }
    const rect = plex.getBoundingClientRect();
    const oldZ = cam.zoom || 1;
    const newZ = Math.min(this.CAMERA_ZOOM_MAX, Math.max(this.CAMERA_ZOOM_MIN, oldZ * factor));
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    // menu zoom: toward center
    const wx = (cx - (cam.panX || 0)) / oldZ;
    const wy = (cy - (cam.panY || 0)) / oldZ;
    this.setCamera({
      zoom: newZ,
      panX: cx - wx * newZ,
      panY: cy - wy * newZ,
    }, false);
  }
  resetCameraView(pushHistory = true) {""",
        1,
    )

# Esc / shortcuts in onGlobalKeyDown
old_esc = """  onGlobalKeyDown = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
"""
if old_esc in c and "Ctrl+0" not in c[c.find("onGlobalKeyDown"):c.find("onGlobalKeyDown")+800]:
    # inject after onGlobalKeyDown start
    c = c.replace(
        old_esc,
        """  onGlobalKeyDown = (e) => {
    // View camera shortcuts
    if (e.ctrlKey && !e.altKey && (e.key === '0' || e.code === 'Digit0')) {
      e.preventDefault();
      this.resetCameraView(true);
      return;
    }
    if (e.ctrlKey && e.shiftKey && (e.key === '=' || e.key === '+' || e.code === 'Equal')) {
      e.preventDefault();
      this.zoomBy(1.1);
      return;
    }
    if (e.ctrlKey && e.shiftKey && (e.key === '-' || e.code === 'Minus')) {
      e.preventDefault();
      this.zoomBy(1/1.1);
      return;
    }
    if (e.key === 'Escape' || e.key === 'Esc') {
""",
        1,
    )

# renderVals: camera layer styles, remove pan from node positions
# buildRows currently uses panX panY from s.panX - change to 0 (camera layer handles it)
c = c.replace(
    "const panX = s.panX || 0, panY = s.panY || 0;",
    "const panX = 0, panY = 0; // pan/zoom applied by camera layer, not per-node",
    1,
)

# activeNodeStyle without pan - use only node offset
# find activeNodeStyle
old_act = None
i = c.find("activeNodeStyle:")
print("activeNodeStyle at", i)
print(c[i:i+350])

# Replace panX panY references in renderVals return
# panX: s.panX -> camera
c = c.replace(
    """      onPlexMouseDown: (e) => this.onPlexMouseDown(e),
      onPlexMouseMove: (e) => this.onPlexMouseMove(e),
      onPlexMouseUp: () => this.onPlexMouseUp(),
      panX: s.panX || 0, panY: s.panY || 0,
      plexCursor: s.panning ? 'grabbing' : 'grab',
""",
    """      onPlexMouseDown: (e) => this.onPlexMouseDown(e),
      onPlexMouseMove: (e) => this.onPlexMouseMove(e),
      onPlexMouseUp: () => this.onPlexMouseUp(),
      onPlexWheel: (e) => this.onPlexWheel(e),
      camera: this.getCamera(),
      cameraLayerStyle: (() => {
        const cam = s.camera || { panX: 0, panY: 0, zoom: 1 };
        const z = cam.zoom || 1;
        const x = cam.panX || 0;
        const y = cam.panY || 0;
        // origin top-left of plex; pan in plex pixels; zoom about 0,0 with pan compensating
        return 'position:absolute;left:0;top:0;width:100%;height:100%;transform-origin:0 0;transform:translate(' + x + 'px,' + y + 'px) scale(' + z + ');will-change:transform;';
      })(),
      zoomLabel: Math.round(((s.camera && s.camera.zoom) || 1) * 100) + '%',
      plexCursor: s.panning ? 'grabbing' : 'default',
""",
    1,
)

# Fix activeNodeStyle if it still uses s.panX
c = re.sub(
    r"activeNodeStyle: \(\(\) => \{ const o = this\.getNodeOffset\(s\.selectedId\); return `position:absolute;left:calc\(50% \+ \$\{\(s\.panX\|\|0\)\+o\.x\}px\);top:calc\(50% \+ \$\{\(s\.panY\|\|0\)\+o\.y\}px\);transform:translate\(-50%,-50%\);cursor:\$\{s\.nodeDrag&&s\.nodeDrag\.id===s\.selectedId\?'grabbing':'grab'\};`; \}\) \(\),",
    "activeNodeStyle: (() => { const o = this.getNodeOffset(s.selectedId); return `position:absolute;left:calc(50% + ${o.x}px);top:calc(50% + ${o.y}px);transform:translate(-50%,-50%);cursor:${s.nodeDrag&&s.nodeDrag.id===s.selectedId?'grabbing':'grab'};`; })(),",
    c,
    count=1,
)
# simpler replace if regex fails
if "s.panX||0)+o.x" in c or "(s.panX||0)+o.x" in c:
    c = c.replace("(s.panX||0)+o.x", "o.x")
    c = c.replace("(s.panY||0)+o.y", "o.y")
    print("activeNode pan stripped")

# radialStyle without pan
c = re.sub(
    r"radialStyle: `position:absolute;left:calc\(50% \+ \$\{s\.panX \|\| 0\}px\);top:calc\(50% \+ \$\{\(s\.panY \|\| 0\) - 118\}px\);transform:translate\(-50%,0\);opacity:0\.35;`,",
    "radialStyle: `position:absolute;left:50%;top:calc(50% - 118px);transform:translate(-50%,0);opacity:0.35;`,",
    c,
    count=1,
)

cpath.write_text(c, encoding="utf-8")
print("cortex camera written", len(c))

# --- Template: wrap plex graph content in camera layer; wheel handler ---
# plex div add onWheel
t = t.replace(
    'onMouseDown={v.onPlexMouseDown} onMouseMove={v.onPlexMouseMove} onMouseUp={v.onPlexMouseUp} onMouseLeave={v.onPlexMouseUp}',
    'onMouseDown={v.onPlexMouseDown} onMouseMove={v.onPlexMouseMove} onMouseUp={v.onPlexMouseUp} onMouseLeave={v.onPlexMouseUp} onWheel={v.onPlexWheel}',
    1,
)

# After plex opens, insert camera layer wrapper after the fullscreen button? 
# Better: wrap from radial svg through active node / create child / context menu stays outside zoom?
# Context menu should stay in screen space (not zoomed) - keep outside camera layer
# Create child popup - maybe outside or inside? Inside is ok for position consistency

# Find start of content after the top-right button div ends
marker_start = '''          <div style={{position: "absolute", top: "12px", right: "14px", width: "26px", height: "26px", borderRadius: "6px", background: "var(--chip-bg)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2.3">
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M16 3h3a2 2 0 0 1 2 2v3" />
              <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </div>
'''
# Insert zoom label near that button
if 'zoomLabel' not in t:
    t = t.replace(
        marker_start,
        marker_start + '''          <div style={{position: "absolute", top: "12px", right: "48px", height: "26px", padding: "0 10px", borderRadius: "6px", background: "var(--chip-bg)", display: "flex", alignItems: "center", fontSize: "11px", color: "var(--text-muted)", fontFamily: "'JetBrains Mono',monospace", zIndex: 6, pointerEvents: "none"}}>
            {v.zoomLabel || "100%"}
          </div>
          <div className="mn-camera-layer" style={css(v.cameraLayerStyle || "position:absolute;inset:0;")}> 
''',
        1,
    )
    print("camera layer open + zoom label")
else:
    print("zoom label exists?")

# Close camera layer before context menu (context menu must not scale)
ctx = t.find("{v.contextMenu ?")
if ctx > 0 and "mn-camera-layer" in t:
    # ensure we close the camera div before context menu
    if "</div>\n          {v.contextMenu" not in t and 'className="mn-camera-layer"' in t:
        # insert closing div before context menu
        t = t[:ctx] + "          </div>{/* mn-camera-layer */}\n" + t[ctx:]
        print("camera layer closed before context menu")
    # mark context menu class
    t = t.replace(
        '{v.contextMenu ? (\n            <div onClick={v.stopProp}',
        '{v.contextMenu ? (\n            <div className="mn-context-menu" onClick={v.stopProp}',
        1,
    )

tpath.write_text(t, encoding="utf-8")
print("template written", len(t))

# verify camera layer balance
opens = t.count('mn-camera-layer')
print("camera layer markers", opens)
print("DONE")
