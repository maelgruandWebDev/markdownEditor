document.addEventListener("DOMContentLoaded", () => {
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    const send = document.getElementById('sendButton');

    // Fonction pour télécharger un fichier
    function download(filename, content) {
        const element = document.createElement('a');
        
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        element.click();
    }

    // Fonction pour insérer du texte Markdown autour de la sélection
    function applyMarkdown(startTag, endTag = '') {
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const selectedText = editor.value.substring(start, end);
        const newText = startTag + selectedText + endTag;
        
        // Appliquer la mise en forme
        editor.setRangeText(newText, start, end, 'end');
        editor.focus();
    }

    // Fonction pour insérer un lien
    function insertLink() {
        const url = prompt("Entrez l'URL :");
        if (url) applyMarkdown(`[`, `](${url})`);
        
    }

    // Fonction pour insérer une image
    function insertImage() {
        const url = prompt("Entrez l'URL de l'image :");
        if (url) applyMarkdown(`![`, `](${url})`);
    }

    // Fonction pour annuler et rétablir
    function undo() {
        document.execCommand("undo");
    }

    function redo() {
        document.execCommand("redo");
    }

    // Ajout des écouteurs d'événements pour la barre d'outils
    document.getElementById('boldBtn').addEventListener('click', () => applyMarkdown('**', '**'));
    document.getElementById('italicBtn').addEventListener('click', () => applyMarkdown('*', '*'));
    document.getElementById('h1Btn').addEventListener('click', () => applyMarkdown('# ', '\n'));
    document.getElementById('h2Btn').addEventListener('click', () => applyMarkdown('## ', '\n'));
    document.getElementById('h3Btn').addEventListener('click', () => applyMarkdown('### ', '\n'));
    document.getElementById('listBtn').addEventListener('click', () => applyMarkdown('- ', '\n'));
    document.getElementById('numListBtn').addEventListener('click', () => applyMarkdown('1. ', '\n'));
    document.getElementById('linkBtn').addEventListener('click', insertLink);
    document.getElementById('imageBtn').addEventListener('click', insertImage);
    document.getElementById('undoBtn').addEventListener('click', undo);
    document.getElementById('redoBtn').addEventListener('click', redo);

    // Met à jour l'aperçu en temps réel
    editor.addEventListener('input', async () => {
        const markdownText = editor.value;
        console.log("Texte Markdown :", markdownText);

        try {
            const htmlContent = await window.electronAPI.convertMarkdown(markdownText);
            console.log("HTML Converti :", htmlContent);
            setTimeout(() => {
                preview.innerHTML = htmlContent;
            }, 10);
        } catch (error) {
            console.error("Erreur lors de la conversion du Markdown:", error);
        }
    });

    // Téléchargement des fichiers Markdown et HTML
    send.addEventListener('click', async () => {
        const markdownText = editor.value;
        download('notes.md', markdownText);

        try {
            const htmlContent = await window.electronAPI.convertMarkdown(markdownText);
            console.log("HTML Converti :", htmlContent);
            setTimeout(() => {
                preview.innerHTML = htmlContent;
            }, 10);
            download('notes.html', htmlContent);
        } catch (error) {
            console.error("Erreur lors de la conversion du Markdown:", error);
        }
    });
});

function cambiarStyleA() {
    // Sélectionner tous les éléments <a>
    let enlaces = document.querySelectorAll("a");

    // Vérifier s'il y a des éléments <a> sur la page
    if (enlaces) {
        for (let i = 0; i < enlaces.length; i++) {
            enlaces[i].style.color = "red";  // Appliquer le style
        }
    }
}

cambiarStyleA();