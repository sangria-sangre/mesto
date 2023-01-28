import { validationConfig, initialCards } from './constants.js';
import Cards from './cards.js'
import FormValidator from './FormValidator.js';

//поставить валидацию на каждом инпуте в документе

const inputList = Array.from(document.querySelectorAll(validationConfig.inputSelector));
inputList.forEach((inputElement) => {
    const validator = new FormValidator(validationConfig, inputElement);
    validator.enableValidation();
});

//show cards

initialCards.forEach((obj) => {
    const card = new Cards(obj.name, obj.link);
    const cardElement = card.generadeCard();

    document.querySelector('.elements').prepend(cardElement);
});

//profile
const profileBtnEdit = document.querySelector('.profile__edit-btn');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileTitleInput = document.querySelector('.popup__input_profile_title');
const profileSubtitleInput = document.querySelector('.popup__input_profile_subtitle');
const profileForm = document.querySelector('.popup__form_profile');
const profilePopup = document.querySelector('.popup_profile');
const profileBtnSave = profileForm.querySelector('.popup__save-btn');

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc)
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

function saveProfilePopup(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileSubtitle.textContent = profileSubtitleInput.value;
    closePopup(profilePopup);
}

profileBtnEdit.addEventListener('click', function () {
    profileTitleInput.value = profileTitle.textContent;
    profileSubtitleInput.value = profileSubtitle.textContent;
    profileBtnSave.classList.remove(validationConfig.inactiveButtonClass);
    profileBtnSave.disabled = false;
    openPopup(profilePopup);
});

profileForm.addEventListener('submit', saveProfilePopup);

//new card from inputs

const itemForm = document.querySelector('.popup__form_item');
const itemInputTitle = document.querySelector('.popup__input_item_title');
const itemInputImage = document.querySelector('.popup__input_item_image');
const profileBtnAdd = document.querySelector('.profile__add-btn');
const itemPopup = document.querySelector('.popup_item');

function addCards(event) {
    event.preventDefault();

    const title = itemInputTitle.value;
    const image = itemInputImage.value;

    const card = new Cards(title, image);
    const cardElement = card.generadeCard();

    document.querySelector('.elements').prepend(cardElement);

    closePopup(itemPopup);

    event.target.reset();
}

itemForm.addEventListener('submit', addCards);

profileBtnAdd.addEventListener('click', function () {
    openPopup(itemPopup);
});

//close alt
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-btn')) {
        closePopup(evt.currentTarget);
    }
}

const popups = Array.from(document.querySelectorAll('.popup'));

popups.forEach((popup) => {
    popup.addEventListener('click', closePopupOverlay);
});