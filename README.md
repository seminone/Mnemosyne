# Mnemosyne — Phase 1 GUI shell

TheBrain 7 Professional–style **functional** interface in **Electron + JavaScript**.

## Run

```powershell
npm install
npm run dev
```

`npm run dev` **builds once then opens Electron** (no Vite file watcher). That avoids Windows `fs.watch` errno `-4094` on this folder path.

Optional hot reload (polling Vite + Electron):

```powershell
npm run dev:hot
```

Rebuild only / start existing `dist/`:

```powershell
npm run build
npm start
```

## Layout

- `electron/main.js` — BrowserWindow, window IPC  
- `electron/preload.js` — `window.mnemosyne` bridge  
- `src/Cortex.jsx` — menus, dialogs, plex logic, pan  
- `src/template.jsx` — GUI markup (from mockup)  
- `src/dataApi.js` — **Phase 2 data seam** (in-memory stubs today)  
- `reference/` — original Cortex v2 mockup + HANDOFF  

## Delegation

See `2026_10_01__DELEGATION__TB7_FUNCTIONAL_GUI_to_ELECTRON__by_CDA_Consilium_III_a.md`  
and handback `2026.10.01__HANDBACK__Phase1_GUI_shell__by_WTA_Labor_III_a.md`.
