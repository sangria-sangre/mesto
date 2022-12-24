//btn close
const btnsClose = document.querySelectorAll('.popup__close-btn');

btnsClose.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});


//profile
const profileBtnEdit = document.querySelector('.profile__edit-btn');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileTitleInput = document.querySelector('.popup__input_profile_title');
const profileSubtitleInput = document.querySelector('.popup__input_profile_subtitle');
const profileForm = document.querySelector('.popup__form_profile');
const profilePopup = document.querySelector('.popup_profile');

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
const imagePopup = document.querySelector('.popup_image');
const imagePopupPicture = document.querySelector('.popup__picture');
const imagePopupSubtitle = document.querySelector('.popup__title_image');

//items

const profileBtnAdd = document.querySelector('.profile__add-btn');
const itemForm = document.querySelector('.popup__form_item');
const itemPopup = document.querySelector('.popup_item');
const itemInputTitle = document.querySelector('.popup__input_item_title');
const itemInputImage = document.querySelector('.popup__input_item_image');
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

    return cloneElement;
}

function showCards() {
    initialCards.forEach(function (item) {
        ;
        const cardElement = createCard(item.name, item.link);
        containerElements.prepend(cardElement);
    });
}
showCards();

function addCards(event) {
    event.preventDefault();

    const title = itemInputTitle.value;
    const image = itemInputImage.value;

    const cardElement = createCard(title, image);
    containerElements.prepend(cardElement);

    closePopup(itemPopup);

    event.target.reset();
}


profileBtnAdd.addEventListener('click', function () {
    openPopup(itemPopup);
});

itemForm.addEventListener('submit', addCards);





