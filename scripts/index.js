let btnEdit = document.querySelector('.profile__edit-btn');
let btnClose = document.querySelector('.popup__close-btn');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let inputTitle = document.querySelector('.popup__input_type_title');
let inputSubtitle = document.querySelector('.popup__input_type_subtitle');
let profileEdit = document.querySelector('.popup__form');
let popup = document.querySelector('.popup');

function openPopup() {
    popup.classList.add('popup_opened');
    inputTitle.value = title.textContent;
    inputSubtitle.value = subtitle.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
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