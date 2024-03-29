export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active'
}

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];



export const profileInfo = {
    name: '.profile__title',
    about: '.profile__subtitle',
};

export const elementsCase = '.elements';
export const elementTemplate = '.element-template';
export const profileBtnEdit = document.querySelector('.profile__edit-btn');
export const profileTitleInput = document.querySelector('.popup__input_profile_title');
export const profileSubtitleInput = document.querySelector('.popup__input_profile_subtitle');
export const profileBtnAdd = document.querySelector('.profile__add-btn');
export const apiUrl = 'https://mesto.nomoreparties.co/v1/cohort-61';
export const apiHeaders = '2509058a-382e-4c49-aae4-82e3509c7f6a';
export const userPhotoCase = document.querySelector('.profile__image');
export const userPhotoEdit = document.querySelector('.profile__image-edit');