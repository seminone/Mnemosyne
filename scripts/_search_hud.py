from pathlib import Path
import re

cpath = Path(r"D:\Claude Design\TheBrain 7 (clone) (2026.08.11.)\GUI_to_Electron\src\Cortex.jsx")
tpath = Path(r"D:\Claude Design\TheBrain 7 (clone) (2026.08.11.)\GUI_to_Electron\src\template.jsx")
c = cpath.read_text(encoding="utf-8")
t = tpath.read_text(encoding="utf-8")

# --- Cortex: searchHits state + runPlexSearch updates chips ---
if "searchHits:" not in c and "searchHits:" not in c.split("state = {")[1][:2000]:
    c = c.replace(
        "plexSearch: '',\n    panelSearch: '',",
        "plexSearch: '',\n    searchHits: [], // HUD chips: { id, title }[] — not affected by camera\n    panelSearch: '',",
        1,
    )
    print("searchHits state")

old_run = """  runPlexSearch() {
    const q = (this.state.plexSearch || '').trim().toLowerCase();
    if (!q) { this.showToast('Enter a search term.'); return; }
    const hits = Object.entries(this.thoughtsData)
      .filter(([, n]) => (n.title || '').toLowerCase().includes(q))
      .map(([id, n]) => ({ id, title: n.title }));
    if (hits.length) {
      this.selectThought(hits[0].id);
      this.showToast('Found ' + hits.length + ': ' + hits.map(h => h.title).join(', '));
    } else {
      this.showToast('No thoughts match "' + q + '".');
    }
  }
"""
# flexible match
m = re.search(r"  runPlexSearch\(\) \{.*?\n  \}\n", c, re.S)
if not m:
    raise SystemExit("runPlexSearch not found")
new_run = """  runPlexSearch() {
    const q = (this.state.plexSearch || '').trim().toLowerCase();
    if (!q) {
      this.setState({ searchHits: [] });
      this.showToast('Enter a search term.');
      return;
    }
    const hits = Object.entries(this.thoughtsData)
      .filter(([, n]) => (n.title || '').toLowerCase().includes(q))
      .map(([id, n]) => ({ id, title: n.title }))
      .sort((a, b) => a.title.localeCompare(b.title));
    // Do not auto-activate: chips are HUD results; user clicks a chip to focus.
    this.setState({ searchHits: hits });
    if (hits.length) {
      this.showToast('Found ' + hits.length + ' match' + (hits.length === 1 ? '' : 'es') + '.');
    } else {
      this.showToast('No thoughts match "' + q + '".');
    }
  }
  onSearchHitClick(id) {
    // Explicit activation from HUD chip only
    this.selectThought(id);
  }
"""
c = c[: m.start()] + new_run + c[m.end() :]
print("runPlexSearch updated")

# renderVals expose searchHits
if "searchHits: s.searchHits" not in c:
    c = c.replace(
        "plexSearch: s.plexSearch, setPlexSearch: (e) => this.setPlexSearch(e),",
        "plexSearch: s.plexSearch, setPlexSearch: (e) => this.setPlexSearch(e),\n"
        "      searchHits: s.searchHits || [],\n"
        "      onSearchHitClick: (id) => this.onSearchHitClick(id),\n",
        1,
    )
    print("renderVals searchHits")

cpath.write_text(c, encoding="utf-8")

# --- Template: remove old search+chip from inside camera; place HUD after camera close ---
# Extract and remove the two bottom bars
old_hud = """          <div style={{position: "absolute", bottom: "14px", left: "14px", display: "flex", gap: "8px", alignItems: "center", zIndex: 5}} onClick={v.stopProp} onMouseDown={v.stopProp}>
            <input
              type="text"
              value={v.plexSearch || ""}
              onChange={v.setPlexSearch}
              onKeyDown={v.onPlexSearchKey}
              placeholder="Search thoughts…"
              style={{width: "230px", height: "26px", borderRadius: "5px", background: "var(--titlebar-bg)", border: "1px solid var(--input-border)", padding: "0 8px", fontSize: "12px", color: "var(--text)", outline: "none"}}
            />
            <div onClick={v.runPlexSearch} style={{height: "26px", padding: "0 14px", borderRadius: "5px", background: "var(--chip-bg)", border: "1px solid var(--input-border-strong)", display: "flex", alignItems: "center", fontSize: "12px", color: "var(--text-tertiary)", cursor: "pointer"}}>
              {"Search"}
            </div>
          </div>
          <div style={{position: "absolute", bottom: "14px", right: "14px", display: "flex", alignItems: "center", gap: "6px", padding: "5px 10px", borderRadius: "5px", background: "var(--titlebar-bg)", border: "1px solid var(--input-border)"}}>
            <div style={{width: "8px", height: "8px", borderRadius: "2px", background: "var(--accent)"}} />
            <div style={{fontSize: "12px", fontWeight: "600"}}>
              {v.activeThought?.title}
            </div>
          </div>
"""

new_hud = """          {/* HUD: search + result chips — outside camera layer (no pan/zoom) */}
          <div
            className="mn-search-hud"
            style={{position: "absolute", bottom: "14px", left: "14px", right: "14px", display: "flex", gap: "8px", alignItems: "center", zIndex: 20, pointerEvents: "none"}}
          >
            <div style={{display: "flex", gap: "8px", alignItems: "center", flex: "none", pointerEvents: "auto"}} onClick={v.stopProp} onMouseDown={v.stopProp}>
              <input
                type="text"
                value={v.plexSearch || ""}
                onChange={v.setPlexSearch}
                onKeyDown={v.onPlexSearchKey}
                placeholder="Search thoughts…"
                style={{width: "230px", height: "26px", borderRadius: "5px", background: "var(--titlebar-bg)", border: "1px solid var(--input-border)", padding: "0 8px", fontSize: "12px", color: "var(--text)", outline: "none", flex: "none"}}
              />
              <div onClick={v.runPlexSearch} style={{height: "26px", padding: "0 14px", borderRadius: "5px", background: "var(--chip-bg)", border: "1px solid var(--input-border-strong)", display: "flex", alignItems: "center", fontSize: "12px", color: "var(--text-tertiary)", cursor: "pointer", flex: "none", whiteSpace: "nowrap"}}>
                {"Search"}
              </div>
            </div>
            <div style={{display: "flex", gap: "6px", alignItems: "center", flex: "1", minWidth: 0, overflowX: "auto", overflowY: "hidden", pointerEvents: "auto", paddingBottom: "2px"}} onClick={v.stopProp} onMouseDown={v.stopProp}>
              {(v.searchHits || []).map((hit, $index) => (
                <div
                  key={hit?.id ?? $index}
                  onClick={() => v.onSearchHitClick?.(hit.id)}
                  title={hit?.title}
                  style={{height: "26px", padding: "0 10px", borderRadius: "5px", background: "var(--titlebar-bg)", border: "1px solid var(--input-border)", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", flex: "none", maxWidth: "200px"}}
                >
                  <div style={{width: "8px", height: "8px", borderRadius: "2px", background: "var(--accent)", flex: "none"}} />
                  <div style={{fontSize: "12px", fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                    {hit?.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
"""

if old_hud not in t:
    # try without exact match - remove pieces
    print("exact hud block missing, trying pieces")
    # remove left search
    m1 = re.search(
        r'          <div style=\{\{position: "absolute", bottom: "14px", left: "14px".*?</div>\n          </div>\n',
        t,
        re.S,
    )
    m2 = re.search(
        r'          <div style=\{\{position: "absolute", bottom: "14px", right: "14px".*?</div>\n          </div>\n',
        t,
        re.S,
    )
    print("m1", bool(m1), "m2", bool(m2))
    if m1:
        t = t[: m1.start()] + t[m1.end() :]
        print("removed left search")
    if m2:
        # m2 indices may shift
        m2 = re.search(
            r'          <div style=\{\{position: "absolute", bottom: "14px", right: "14px".*?</div>\n          </div>\n',
            t,
            re.S,
        )
        if m2:
            t = t[: m2.start()] + t[m2.end() :]
            print("removed right chip")
else:
    t = t.replace(old_hud, "", 1)
    print("removed old hud block")

# Insert new HUD after camera layer close, before context menu (or after context menu, still in plex)
# Prefer after camera close so it's sibling of camera layer inside plex
anchor = "          </div>{/* mn-camera-layer */}"
if anchor in t:
    t = t.replace(anchor, anchor + "\n" + new_hud, 1)
    print("HUD inserted after camera layer")
else:
    # after plex wheel div open - find context menu
    ctx = t.find("{v.contextMenu ?")
    if ctx > 0:
        t = t[:ctx] + new_hud + "\n" + t[ctx:]
        print("HUD inserted before context menu")
    else:
        raise SystemExit("no insert point for HUD")

tpath.write_text(t, encoding="utf-8")
print("template saved", len(t))

# CSS for HUD scrollbar subtle
csspath = Path(r"D:\Claude Design\TheBrain 7 (clone) (2026.08.11.)\GUI_to_Electron\src\index.css")
css = csspath.read_text(encoding="utf-8")
if "mn-search-hud" not in css:
    css += """
/* Search HUD — fixed to plex viewport, not camera */
.mn-search-hud {
  z-index: 20;
}
.mn-search-hud::-webkit-scrollbar { height: 6px; }
"""
    csspath.write_text(css, encoding="utf-8")
    print("css hud")

print("DONE")
