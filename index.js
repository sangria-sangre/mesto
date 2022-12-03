let btnEdit = document.querySelector('.profile__edit-btn');
let btnClose = document.querySelector('.popup__close-btn');
let btnSave = document.querySelector('.popup__save-btn');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let inputTitle = document.querySelector('#title');
let inputSubtitle = document.querySelector('#subtitle');

inputTitle.value = title.textContent;
inputSubtitle.value = subtitle.textContent;

function openPopup () {
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup');
    popup.classList.add('popup_active');
}

function closePopup () {
    let popup = document.querySelector('.popup_active');
    popup.classList.remove('popup_active');
    popup.classList.add('popup');
    inputTitle.value = title.textContent;
    inputSubtitle.value = subtitle.textContent;
}

function savePopup () {
    title.textContent = inputTitle.value;
    subtitle.textContent = inputSubtitle.value;
    closePopup (); 
}

btnEdit.addEventListener('click', openPopup);
btnClose.addEventListener('click', closePopup);
btnSave.addEventListener('click', savePopup);

function handleKeyPress(e){
    if (e.keyCode == 13) {
        savePopup ();
    }
}