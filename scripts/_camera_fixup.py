from pathlib import Path
import re
cpath = Path(r"D:\Claude Design\TheBrain 7 (clone) (2026.08.11.)\GUI_to_Electron\src\Cortex.jsx")
c = cpath.read_text(encoding="utf-8")
# fix activeNodeStyle fully
c = re.sub(
    r"activeNodeStyle: \(\(\) => \{ const o = this\.getNodeOffset\(s\.selectedId\); return `[^`]+`; \}\) \(\),",
    "activeNodeStyle: (() => { const o = this.getNodeOffset(s.selectedId); return `position:absolute;left:calc(50% + ${o.x}px);top:calc(50% + ${o.y}px);transform:translate(-50%,-50%);cursor:${s.nodeDrag&&s.nodeDrag.id===s.selectedId?'grabbing':'grab'};`; })(),",
    c,
    count=1,
)
# force simpler
if "s.panX" in c or "s.panY" in c:
    print("remaining pan refs:")
    for i,line in enumerate(c.splitlines(),1):
        if "s.panX" in line or "s.panY" in line:
            print(i, line[:120])
    c = c.replace("s.panX || 0", "0")
    c = c.replace("s.panY || 0", "0")
    c = c.replace("(s.panX||0)+", "")
    c = c.replace("(s.panY||0)+", "")
    # careful - might break cameraLayerStyle if any - check
    print("after strip pan line samples")
    for i,line in enumerate(c.splitlines(),1):
        if "panX" in line or "panY" in line:
            if "camera" in line or "cam." in line or "getCamera" in line or "setCamera" in line or "panOrigin" in line or "CAMERA" in line or "history" in line or "partial" in line:
                continue
            if "panX: 0" in line or "const panX = 0" in line:
                continue
            print("?", i, line[:100])

# Fix radialStyle line
c = re.sub(
    r"radialStyle: `position:absolute;left:calc\(50% \+ \$\{[^}]+\}px\);top:calc\(50% \+ \$\{[^}]+\}px\);transform:translate\(-50%,0\);opacity:0\.35;`,",
    "radialStyle: `position:absolute;left:50%;top:calc(50% - 118px);transform:translate(-50%,0);opacity:0.35;`,",
    c,
    count=1,
)

# Non-passive wheel: attach in componentDidMount
if "plexWheelNative" not in c:
    c = c.replace(
        "window.addEventListener('keydown', this.onGlobalKeyDown);",
        """window.addEventListener('keydown', this.onGlobalKeyDown);
    this._plexWheelNative = (ev) => this.onPlexWheel(ev);
    // attach after first paint
    setTimeout(() => {
      const plex = this.plexRef.current;
      if (plex) plex.addEventListener('wheel', this._plexWheelNative, { passive: false });
    }, 0);""",
        1,
    )
    c = c.replace(
        "window.removeEventListener('keydown', this.onGlobalKeyDown);",
        """window.removeEventListener('keydown', this.onGlobalKeyDown);
    const plex = this.plexRef.current;
    if (plex && this._plexWheelNative) plex.removeEventListener('wheel', this._plexWheelNative);""",
        1,
    )

# ensure getCamera exists once
print("getCamera count", c.count("getCamera()"))
print("setCamera count", c.count("setCamera("))
print("onPlexWheel count", c.count("onPlexWheel"))

cpath.write_text(c, encoding="utf-8")

# template: preventDefault needs native listener - onWheel still ok as backup
# create-child positions are in plex coords - inside camera layer is correct

tpath = Path(r"D:\Claude Design\TheBrain 7 (clone) (2026.08.11.)\GUI_to_Electron\src\template.jsx")
t = tpath.read_text(encoding="utf-8")
# verify camera layer structure
print("camera open", t.count('className="mn-camera-layer"'))
print("camera close comment", t.count("mn-camera-layer */"))
# If create child is outside camera layer, drag positions wrong - check order
i = t.find("showCreateChild")
j = t.find("mn-camera-layer */")
print("createChild idx", i, "close camera", j, "create inside" , i < j if i>0 and j>0 else None)

print("DONE fixes")
