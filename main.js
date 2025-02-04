const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { marked } = require('marked');

let win; // Déclarer la fenêtre globalement

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'assets', 'favicon.ico'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html'); // Ajout de cette ligne pour charger le fichier HTML

    if (!app.isPackaged) {
        win.webContents.openDevTools(); // Ouvre DevTools uniquement en développement
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Gestion du Markdown
ipcMain.handle('convertMarkdown', (event, markdownText) => {
    try {
        console.log("Texte reçu dans main.js :", markdownText);
        return marked.parse(markdownText);
    } catch (error) {
        console.error('Erreur lors de la conversion Markdown:', error);
        return '';
    }
});
