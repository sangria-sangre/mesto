//profile

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


//items

const btnAdd = document.querySelector('.profile__add-btn');
const btnCloseItem = document.querySelector('.popup-item__close-btn');
const btnCreateItem = document.querySelector('.popup-item__form');
const inputTitleItem = document.querySelector('.popup-item__input_type_title');
const inputImageItem = document.querySelector('.popup-item__input_type_image');
const popupItem = document.querySelector('.popup-item');
const initialCards = [
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

const containerElements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;

function openPopupItem() {
    popupItem.classList.add('popup-item_opened');
}

function closePopupItem() {
    popupItem.classList.remove('popup-item_opened');
}

function showItems() {
    initialCards.forEach(function (element) {
        const cloneElement = elementTemplate.querySelector('.element').cloneNode(true);
        cloneElement.querySelector('.element__image').src = element.link;
        cloneElement.querySelector('.element__title').textContent = element.name;

        cloneElement.querySelector('.element__like-btn').addEventListener('click', function (event) {
            event.target.classList.toggle('element__like-btn_active');
        });

        cloneElement.querySelector('.element__delete-btn').addEventListener('click', function (event) {
            event.target.parentElement.remove();
        });

        cloneElement.querySelector('.element__image').addEventListener('click', function () {
            popupImage.querySelector('.popup-image__image').src = element.link;
            popupImage.querySelector('.popup-image__subtitle').textContent = element.name;
            popupImage.classList.add('popup-image_opened');
            popupImage.classList.add('animation-open');
        });

        containerElements.append(cloneElement);
    });
}

showItems();

function showAllItems() {
    containerElements.innerHTML = '';
    showItems();
}

function addItem(event) {
    event.preventDefault();
    const item = {
        name: inputTitleItem.value,
        link: inputImageItem.value
    }
    initialCards.unshift(item);
    showAllItems()
    closePopupItem();
}


btnAdd.addEventListener('click', openPopupItem);
btnCloseItem.addEventListener('click', closePopupItem);
btnCreateItem.addEventListener('submit', addItem);


//image

const popupImage = document.querySelector('.popup-image');
const btnCloseImage = document.querySelector('.popup-image__close-btn');

function closePopupImage() {
    popupImage.classList.remove('popup-image_opened');
}

btnCloseImage.addEventListener('click', closePopupImage);





