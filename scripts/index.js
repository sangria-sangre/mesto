let btnEdit = document.querySelector('.profile__edit-btn');
let btnClose = document.querySelector('.popup__close-btn');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let inputTitle = document.querySelector('.popup__input_title');
let inputSubtitle = document.querySelector('.popup__input_subtitle');
let profileEdit = document.forms['profile-edit'];
let popup = document.querySelector('.popup');

function openPopup() {
    popup.classList.toggle('popup_opened');
    inputTitle.value = title.textContent;
    inputSubtitle.value = subtitle.textContent;
}

function closePopup() {
    popup.classList.toggle('popup_opened');
}

function savePopup(evt) {
    evt.preventDefault();
    title.textContent = inputTitle.value;
    subtitle.textContent = inputSubtitle.value;
    closePopup();
}

btnEdit.addEventListener('click', openPopup);
btnClose.addEventListener('click', closePopup);
profileEdit.addEventListener('submit', savePopup);