export default class Cards {
    constructor(text, image) {
        this._text = text;
        this._image = image;
    }

    _getTemplate() {
        const cardElement = document.querySelector('#element').content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    generadeCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__title').textContent = this._text;
        this._element.querySelector('.element__image').src = this._image;
        return this._element;
    }

    _removeElement() {
        this._element.remove();
    }

    _likeBtnToggle() {
        this._element.querySelector('.element__like-btn').classList.toggle('element__like-btn_active');
    }

    _elementOpen() {
        const popupPicture = document.querySelector('.popup__picture');
        popupPicture.src = this._image;
        popupPicture.alt = this._text;
        document.querySelector('.popup__title_image').textContent = this._text;
        document.querySelector('.popup_image').classList.add('popup_opened');
    }

    _setEventListeners() {

        this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
            this._removeElement()
        });

        this._element.querySelector('.element__like-btn').addEventListener('click', () => {
            this._likeBtnToggle();
        });

        this._element.querySelector('.element__image').addEventListener(('click'), () => {
            this._elementOpen();
        })
    }
}