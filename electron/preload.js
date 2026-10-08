const { contextBridge, ipcRenderer } = require('electron');

/**
 * Renderer ↔ main bridge.
 * Phase 2 will extend this with data IPC (SQLite ego-graph, notes, attachments).
 */
contextBridge.exposeInMainWorld('mnemosyne', {
  getAppInfo: () => ipcRenderer.invoke('app:get-info'),
  window: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximizeToggle: () => ipcRenderer.invoke('window:maximize-toggle'),
    close: () => ipcRenderer.invoke('window:close'),
  },
  openExternal: (url) => ipcRenderer.invoke('shell:open-external', url),
});
