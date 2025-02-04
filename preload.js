const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Envoie le texte Markdown au main process pour le convertir
    convertMarkdown: (markdownText) => ipcRenderer.invoke('convertMarkdown', markdownText)
});
