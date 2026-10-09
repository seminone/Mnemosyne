from pathlib import Path
t=Path(r"D:\Claude Design\TheBrain 7 (clone) (2026.08.11.)\GUI_to_Electron\src\template.jsx").read_text(encoding="utf-8")
c=Path(r"D:\Claude Design\TheBrain 7 (clone) (2026.08.11.)\GUI_to_Electron\src\Cortex.jsx").read_text(encoding="utf-8")
for k in ["plexSearch","runPlexSearch","Search thoughts","bottom: \"14px\"","activeThought?.title"]:
    print(k, t.find(k))
i=t.find("Search thoughts")
print("---SEARCH---")
print(t[i-400:i+900])
print("---")
i=t.find('bottom: "14px", right')
print(t[i-100:i+500] if i>=0 else "no right chip")
# find bottom right chip
i=t.find("bottom: \"14px\", right")
if i<0:
    i=t.find("bottom: \"14px\"")
    print("all bottom 14", [t.find("bottom: \"14px\"")])
    idx=0
    while True:
        j=t.find('bottom: "14px"', idx)
        if j<0: break
        print("--- at", j)
        print(t[j-80:j+350])
        idx=j+1
print("runPlexSearch in c", "runPlexSearch" in c)
i=c.find("runPlexSearch()")
print(c[i:i+500])
