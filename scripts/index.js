//btn close
const btnClose = document.querySelectorAll('.popup__close-btn');

btnClose.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});


//profile
const profileBtnEdit = document.querySelector('.profile__edit-btn');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileTitleInput = document.querySelector('.profile-popup__input_type_title');
const profileSubtitleInput = document.querySelector('.profile-popup__input_type_subtitle');
const profileForm = document.querySelector('.profile-popup__form');
const profilePopup = document.querySelector('.profile-popup');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function savePopup(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileSubtitle.textContent = profileSubtitleInput.value;
    closePopup(profilePopup);
}

profileBtnEdit.addEventListener('click', function () {
    openPopup(profilePopup);
    profileTitleInput.value = profileTitle.textContent;
    profileSubtitleInput.value = profileSubtitle.textContent;
});

profileForm.addEventListener('submit', savePopup);

//image
const imagePopup = document.querySelector('.image-popup');
const imagePopupPicture = document.querySelector('.image-popup__image');
const imagePopupSubtitle = document.querySelector('.image-popup__subtitle');

//items

const profileBtnAdd = document.querySelector('.profile__add-btn');
const itemForm = document.querySelector('.item-popup__form');
const itemPopup = document.querySelector('.item-popup');
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
const cardTemplate = elementTemplate.querySelector('.element').cloneNode(true);
let cardElement;

function createCard(title, image) {

    const cloneElement = elementTemplate.querySelector('.element').cloneNode(true); 
        cloneElement.querySelector('.element__image').src = image; 
        cloneElement.querySelector('.element__image').alt = title; 
        cloneElement.querySelector('.element__title').textContent = title; 

        cloneElement.querySelector('.element__like-btn').addEventListener('click', function (event) { 
            event.target.classList.toggle('element__like-btn_active'); 
        }); 

        cloneElement.querySelector('.element__delete-btn').addEventListener('click', function (event) { 
            event.target.parentElement.remove(); 
        }); 

        cloneElement.querySelector('.element__image').addEventListener('click', function () { 
            imagePopupPicture.src = image; 
            imagePopupPicture.alt = title; 
            imagePopupSubtitle.textContent = title; 
            imagePopup.classList.add('popup_opened');
        }); 

    cardElement = cloneElement;
    return cardElement;
}

function showCards() {
    initialCards.forEach(function (item) {;
        createCard(item.name, item.link);
        containerElements.append(cardElement);
    });
}
showCards();

function addCards(event) {
    event.preventDefault();

    const title = document.querySelector('.item-popup__input_type_title');
    const image = document.querySelector('.item-popup__input_type_image');

    createCard(title.value, image.value);
    containerElements.prepend(cardElement);

    closePopup(itemPopup);

    title.value = '';
    image.value = '';
}


profileBtnAdd.addEventListener('click', function () {
    openPopup(itemPopup);
});

itemForm.addEventListener('submit', addCards);





