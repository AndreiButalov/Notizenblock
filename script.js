let arrTitle = [];
let arrNotes = [];

let arrTrashTitle = [];
let arrTrashNotes = [];

loadNotes();
loadTrashNotes();


function render() {

    let content = document.getElementById('post');

    content.innerHTML = '';
    content.innerHTML += /*html*/ `
        <input id="title" placeholder="Title">
        <input id="notizen" placeholder="Notizen">
        <button onclick="addNotes()" class="button">Add</button>
        <div id="post_box"></div>
        
        `;

    contentPost = document.getElementById('post_box');
    for (let i = 0; i < arrTitle.length; i++) {

        const title = arrTitle[i];
        const notizen = arrNotes[i];

        contentPost.innerHTML += /*html*/`
            <div class="message">
                <h3>${title}</h3>        
                <p>${notizen}</p>
                <div class="button_message">
                    <button onclick="deleteNotes(${i})" class="delete_button">Delete</button>
                </div>
            </div>
            `;
    }

}


function renderTrash() {
    let trashContent = document.getElementById('trash');
    trashContent.innerHTML = '';

    for (let i = 0; i < arrTrashTitle.length; i++) {

        const trashTitle = arrTrashTitle[i];
        const trashNotizen = arrTrashNotes[i];

        trashContent.innerHTML += /*html*/`
        <div class="message">            
            <h3>${trashTitle}</h3>        
            <p>${trashNotizen}</p> 
            <div class="button_message">            
                <button onclick="recoverNotes(${i})" class="delete_button">Wiederherstellen</button>
            </div>
        </div>        
    `;
    }

}


function addNotes() {
    let title = document.getElementById('title');
    let notizen = document.getElementById('notizen');

    if (title.value && notizen.value) {
        arrTitle.push(title.value);
        arrNotes.push(notizen.value);
        render();
        saveNotes();
    } else {
        alert('Bitte fügen Sie Leere Felde ein!')
    }


}


function deleteNotes(i) {

    arrTrashTitle.push(arrTitle[i]);
    arrTrashNotes.push(arrNotes[i]);

    arrTitle.splice(i, 1);
    arrNotes.splice(i, 1);

    render();
    saveNotes();
    saveTrashNotes();
}


function saveNotes() {

    let titleAsText = JSON.stringify(arrTitle);
    localStorage.setItem('arrTitle', titleAsText);

    let notesAsText = JSON.stringify(arrNotes);
    localStorage.setItem('arrNotizen', notesAsText);
}


function loadNotes() {
    let titleAsText = localStorage.getItem('arrTitle');
    let notesAsText = localStorage.getItem('arrNotizen');

    if (titleAsText && notesAsText) {
        arrTitle = JSON.parse(titleAsText);
        arrNotes = JSON.parse(notesAsText);
    }

}


function saveTrashNotes() {
    let titleAsText = JSON.stringify(arrTrashTitle);
    localStorage.setItem('arrTrashTitle', titleAsText);

    let notesAsText = JSON.stringify(arrTrashNotes);
    localStorage.setItem('arrTrashNotizen', notesAsText);
}


function loadTrashNotes() {
    let titleAsText = localStorage.getItem('arrTrashTitle');
    let notesAsText = localStorage.getItem('arrTrashNotizen');

    if (titleAsText && notesAsText) {
        arrTrashTitle = JSON.parse(titleAsText);
        arrTrashNotes = JSON.parse(notesAsText);
    }

}


function deleteTrashNotes() {

    localStorage.removeItem('arrTrashTitle');
    localStorage.removeItem('arrTrashNotizen');

    location.reload();
}


function recoverNotes(i) {
    arrTitle.push(arrTrashTitle[i]);
    arrNotes.push(arrTrashTitle[i]);

    arrTrashTitle.splice(i, 1);
    arrTrashNotes.splice(i, 1);

    renderTrash();
    saveNotes();
    saveTrashNotes();
}