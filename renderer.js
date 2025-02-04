document.addEventListener("DOMContentLoaded", () => {
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    const send = document.getElementById('sendButton'); // Bouton pour envoyer

    // Fonction pour télécharger un fichier
    function download(filename, content) {
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        element.click();
    }

    // Écouteur d'événement sur l'éditeur
    editor.addEventListener('input', async () => {
        const markdownText = editor.value;
        console.log("Texte Markdown :", markdownText);  // ✅ Vérifie si le texte est bien lu

        try {
            const htmlContent = await window.electronAPI.convertMarkdown(markdownText);
            console.log("HTML Converti :", htmlContent); // ✅ Vérifie si le HTML est bien généré
            setTimeout(() => {
                preview.innerHTML = htmlContent;
            }, 10);

        } catch (error) {
            console.error("Erreur lors de la conversion du Markdown:", error);
        }
    });

    // Écouteur d'événement sur le bouton "send"
    send.addEventListener('click', async () => {
        const markdownText = editor.value;
        download('notes.md', markdownText);  // Télécharge le fichier Markdown
        try {
            const htmlContent = await window.electronAPI.convertMarkdown(markdownText);
            console.log("HTML Converti :", htmlContent); // ✅ Vérifie si le HTML est bien généré
            setTimeout(() => {
                preview.innerHTML = htmlContent;  // Met à jour la prévisualisation HTML
            }, 10);
            download('notes.html', htmlContent);  // Télécharge le fichier HTML
        } catch (error) {
            console.error("Erreur lors de la conversion du Markdown:", error);
        }
    });
});
