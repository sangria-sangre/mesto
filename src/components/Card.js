export default class Card {
    constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, templateSelector) {
        this._currentUserId = data.currentUserId;
        this._card = data.card;
        this._cardId = data.cardId;
        this._cardOwner = data.cardOwner;
        this._cardText = data.cardText;
        this._cardImage = data.cardImage;
        this._cardLikes = data.cardLikes;
        this._cardOwnerCheck =this._cardOwner === this._currentUserId;

        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _chekOwner() {
        if (!this._cardOwnerCheck) {
            this._element.querySelector('.element__delete-btn').remove();
        }
    }

    generadeCard() {
        this._element = this._getTemplate();
        this._elementImage = this._element.querySelector('.element__image');
        this._likesNamberContainer = this._element.querySelector('.element__likes-number');
        this._likeButton = this._element.querySelector('.element__like-btn');
        this._deleteButton = this._element.querySelector('.element__delete-btn');

        this._chekOwner();
        this._setEventListeners();
        this.updateLikes(this._cardLikes);

        this._element.querySelector('.element__title').textContent = this._cardText;
        this._elementImage.src = this._cardImage;
        this._elementImage.alt = this._cardText;
        return this._element;
    }

    updateLikes(newLikes) {
        this._likes = newLikes;
        this._likesNamberContainer.textContent = this._likes.length;

        this._isLiked = this._likes.some((like) => like._id === this._currentUserId);
        if (this._isLiked) {
            this._likeButton.classList.add('element__like-btn_active');
        } else {
            this._likeButton.classList.remove('element__like-btn_active');
        }
    }

    removeElement(id, popup) {
        popup.open(id, this._element);
    }

    _setEventListeners() {
        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteIconClick(this._card);
        });

        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick(this._card, this._currentUserId);
        });

        this._elementImage.addEventListener(('click'), () => {
            this._handleCardClick(this._cardText, this._cardImage);
        });
    }
}