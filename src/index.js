import './index.css';
import {
    validationConfig, initialCards, elementsCase, elementTemplate, elementsConteiner,
    profileBtnEdit, profileTitleInput, profileSubtitleInput, profileBtnAdd,
} from './utils/constants.js';
import Card from './components/Card.js'
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import PopupWithImage from './components/PopupWithImage.js';

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

// popupImage
const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();

const handleCardClick = (text, image) => {
    popupImage.open(text, image);
}

//Cards
const defaultCardList = new Section({
    data: initialCards,
    renderer: (item) => {
        const card = new Card(item.name, item.link, elementTemplate, handleCardClick);
        const cardElement = card.generadeCard();
        defaultCardList.addItem(cardElement);
    }
}, elementsCase);

defaultCardList.renderItems();

//profileForm
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

profileBtnEdit.addEventListener('click', function () {
    const user = userInfo.getUserInfo();
    profileTitleInput.value = user.name;
    profileSubtitleInput.value = user.info;
    formValidators['profile-edit'].resetValidation();
    PopupWithFormProfile.open();
});

const PopupWithFormProfile = new PopupWithForm('.popup_profile', {
    submitForm: (evt) => {
        evt.preventDefault();
        const user = PopupWithFormProfile._getInputValues();
        userInfo.setUserInfo(user);
        PopupWithFormProfile.close();
    }
});

PopupWithFormProfile.setEventListeners();

//ItemForm
const PopupWithFormItem = new PopupWithForm('.popup_item', {
    submitForm: (evt) => {
        evt.preventDefault();
        const cardInputInfo = PopupWithFormItem._getInputValues();
        const cardInput = new Card(cardInputInfo.description, cardInputInfo.image, elementTemplate, handleCardClick);
        const cardElement = cardInput.generadeCard();
        elementsConteiner.prepend(cardElement);
        PopupWithFormItem.close();
    }
});

PopupWithFormItem.setEventListeners();

profileBtnAdd.addEventListener('click', function () {
    formValidators['new-item'].resetValidation();
    PopupWithFormItem.open();
});