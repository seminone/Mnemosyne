from pathlib import Path
c=Path(r"D:\Claude Design\TheBrain 7 (clone) (2026.08.11.)\GUI_to_Electron\src\Cortex.jsx").read_text(encoding="utf-8")
import re
for m in re.finditer(r"^  (openRenameDialog|confirmRenameThought)", c, re.M):
    print(m.start(), m.group(1), "line", c[:m.start()].count("\n")+1)
# if two openRenameDialog methods, remove the second
positions = [m.start() for m in re.finditer(r"^  openRenameDialog\(id", c, re.M)]
print("positions", positions)
if len(positions) >= 2:
    # find end of second method - next method at same indent
    s = positions[1]
    # find from s the full method until next \n  word at class level
    rest = c[s:]
    m2 = re.match(r"  openRenameDialog\(id.*?\n  \}\n", rest, re.S)
    if m2:
        print("removing second openRename", len(m2.group(0)))
        c = c[:s] + c[s+len(m2.group(0)):]
positions2 = [m.start() for m in re.finditer(r"^  confirmRenameThought\(\)", c, re.M)]
print("confirm positions", positions2)
if len(positions2) >= 2:
    s = positions2[1]
    rest = c[s:]
    m2 = re.match(r"  confirmRenameThought\(\).*?\n  \}\n", rest, re.S)
    if m2:
        print("removing second confirm", len(m2.group(0)))
        c = c[:s] + c[s+len(m2.group(0)):]
Path(r"D:\Claude Design\TheBrain 7 (clone) (2026.08.11.)\GUI_to_Electron\src\Cortex.jsx").write_text(c, encoding="utf-8")
c=Path(r"D:\Claude Design\TheBrain 7 (clone) (2026.08.11.)\GUI_to_Electron\src\Cortex.jsx").read_text(encoding="utf-8")
print("final open", len(re.findall(r"^  openRenameDialog", c, re.M)))
print("final confirm", len(re.findall(r"^  confirmRenameThought", c, re.M)))
# ensure first confirm is complete after openRename
i=c.find("  openRenameDialog")
print(c[i:i+900])
