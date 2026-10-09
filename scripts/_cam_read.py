from pathlib import Path
c = Path(r"D:\Claude Design\TheBrain 7 (clone) (2026.08.11.)\GUI_to_Electron\src\Cortex.jsx").read_text(encoding="utf-8")
# key sections
for key in ["panX", "onPlexMouseDown", "scale:", "updateScale", "view:", "Manage Saved", "wrapperStyle", "activeNodeStyle"]:
    print(key, c.find(key))
i=c.find("state = {")
print(c[i:i+900])
print("---")
i=c.find("onPlexMouseDown")
print(c[i:i+700])
print("---")
i=c.find("updateScale")
print(c[i:i+500])
print("---")
i=c.find("view: { label")
print(c[i:i+400])
