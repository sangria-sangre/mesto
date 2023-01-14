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
    openPopup(profilePopup);
});

profileForm.addEventListener('submit', saveProfilePopup);

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
const cardsContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;

function createCard(title, image) {

    const cloneElement = elementTemplate.querySelector('.element').cloneNode(true);
    const elementImage = cloneElement.querySelector('.element__image');
    elementImage.src = image;
    elementImage.alt = title;
    cloneElement.querySelector('.element__title').textContent = title;

    cloneElement.querySelector('.element__like-btn').addEventListener('click', function (event) {
        event.target.classList.toggle('element__like-btn_active');
    });

    cloneElement.querySelector('.element__delete-btn').addEventListener('click', function (event) {
        event.target.closest.remove();
    });

    elementImage.addEventListener('click', function () { 
        imagePopupPicture.src = image; 
        imagePopupPicture.alt = title; 
        imagePopupSubtitle.textContent = title; 
        openPopup(imagePopup); 
    }); 

    return cloneElement;
}

function openImage(title, image) {
    imagePopupPicture.src = image;
    imagePopupPicture.alt = title;
    imagePopupSubtitle.textContent = title;
    openPopup(imagePopup);
}

function renderCard(cardElement){
    cardsContainer.prepend(cardElement);
}

function showCards() {
    initialCards.forEach(function (item) {
        const cardElement = createCard(item.name, item.link);
        renderCard(cardElement);
    });
}
showCards();

function addCards(event) {
    event.preventDefault();

    const title = itemInputTitle.value;
    const image = itemInputImage.value;

    const cardElement = createCard(title, image);
    renderCard(cardElement);

    closePopup(itemPopup);

    event.target.reset();
}

profileBtnAdd.addEventListener('click', function () {
    openPopup(itemPopup);
});

itemForm.addEventListener('submit', addCards);

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