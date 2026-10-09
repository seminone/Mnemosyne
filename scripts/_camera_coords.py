from pathlib import Path
cpath = Path(r"D:\Claude Design\TheBrain 7 (clone) (2026.08.11.)\GUI_to_Electron\src\Cortex.jsx")
c = cpath.read_text(encoding="utf-8")
old = """    const rect = plex.getBoundingClientRect();
    // pointer in plex local CSS pixels (chrome fit-scale already applied by parent)
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
"""
new = """    const rect = plex.getBoundingClientRect();
    // Convert screen px → plex layout px (parent chrome may be CSS-scaled)
    const sx = rect.width / Math.max(1, plex.clientWidth);
    const sy = rect.height / Math.max(1, plex.clientHeight);
    const mx = (e.clientX - rect.left) / sx;
    const my = (e.clientY - rect.top) / sy;
"""
if old in c:
    c = c.replace(old, new, 1)
    print("wheel coords fixed")
else:
    print("wheel coords block missing")
    i=c.find("onPlexWheel")
    print(c[i:i+500])

# pan move: use same conversion
old2 = """    const fit = this.state.scale || 1;
    const ox = this.state.panOrigin;
    const panX = ox.panX + (e.clientX - ox.x) / fit;
    const panY = ox.panY + (e.clientY - ox.y) / fit;
"""
new2 = """    const plex = this.plexRef.current;
    const rect = plex ? plex.getBoundingClientRect() : null;
    const sx = rect ? rect.width / Math.max(1, plex.clientWidth) : (this.state.scale || 1);
    const sy = rect ? rect.height / Math.max(1, plex.clientHeight) : (this.state.scale || 1);
    const ox = this.state.panOrigin;
    const panX = ox.panX + (e.clientX - ox.x) / sx;
    const panY = ox.panY + (e.clientY - ox.y) / sy;
"""
if old2 in c:
    c = c.replace(old2, new2, 1)
    print("pan move coords fixed")
else:
    print("pan move block missing")

cpath.write_text(c, encoding="utf-8")
print("ok")
