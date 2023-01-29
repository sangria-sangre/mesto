import { validationConfig, initialCards } from './constants.js';
import Card from './Card.js'
import FormValidator from './FormValidator.js';

//Активация валидации
const formValidators = {}

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('name');

        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(validationConfig);

//profile
const profileBtnEdit = document.querySelector('.profile__edit-btn');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileTitleInput = document.querySelector('.popup__input_profile_title');
const profileSubtitleInput = document.querySelector('.popup__input_profile_subtitle');
const profileForm = document.querySelector('.popup__form_profile');
const profilePopup = document.querySelector('.popup_profile');

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
    formValidators['profile-edit'].resetValidation();
    openPopup(profilePopup);
});

profileForm.addEventListener('submit', saveProfilePopup);

//Cards
const elementsCase = document.querySelector('.elements');

function createCard(item) {
    const card = new Card(item.name, item.link, '.element-template', handleCardClick);
    const cardElement = card.generadeCard();
    return cardElement;
}

initialCards.forEach((obj) => {
    const cardElement = createCard(obj);
    elementsCase.prepend(cardElement);
});

//New card from inputs
const itemForm = document.querySelector('.popup__form_item');
const itemInputTitle = document.querySelector('.popup__input_item_title');
const itemInputImage = document.querySelector('.popup__input_item_image');
const profileBtnAdd = document.querySelector('.profile__add-btn');
const itemPopup = document.querySelector('.popup_item');

function addCards(event) {
    event.preventDefault();

    const name = itemInputTitle.value;
    const link = itemInputImage.value;

    const cardElement = createCard({ name, link });
    elementsCase.prepend(cardElement);

    closePopup(itemPopup);
    event.target.reset();
}

itemForm.addEventListener('submit', addCards);

profileBtnAdd.addEventListener('click', function () {
    formValidators['new-item'].resetValidation();
    itemForm.reset();
    openPopup(itemPopup);
});

//Open popupPicture
const popupPicture = document.querySelector('.popup__picture');
const popupTitleImage = document.querySelector('.popup__title_image');
const popupImage = document.querySelector('.popup_image');

function handleCardClick(text, image) {
    popupPicture.src = image;
    popupPicture.alt = text;
    popupTitleImage.textContent = text;
    openPopup(popupImage);
}

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