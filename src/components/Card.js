export default class Card {
    constructor(item, templateSelector, handleCardClick, userId, deleteElement, putLike, deleteLike, chekLikeNumber, chekLikeStatus) {
        this._item = item;
        this._text = item.name;
        this._image = item.link;
        this._userId = userId;
        this._owner = item.owner._id === userId;
        this._id = item._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._deleteElement = deleteElement;
        this._putLike = putLike;
        this._deleteLike = deleteLike;
        this._chekLikeNumber = chekLikeNumber;
        this.chekLikeStatus = chekLikeStatus;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _chekOwner() {
        if (!this._owner) {
            this._element.querySelector('.element__delete-btn').remove();
        }
    }

    generadeCard() {
        this._element = this._getTemplate();

        this._elementImage = this._element.querySelector('.element__image');
        this._setEventListeners();

        this._chekOwner();

        this._likesNamberContainer = this._element.querySelector('.element__likes-number');
        this._likeCounter();
        this._checkLike();

        this._element.querySelector('.element__title').textContent = this._text;
        this._elementImage.src = this._image;
        this._elementImage.alt = this._text;
        return this._element;
    }

    _removeElement() {
        this._deleteElement.open(this._id, this._element);
    }

    _checkLike() {
        this.chekLikeStatus(this._id, this._userId)
            .then((res) => {
                if (res) {
                    this._likeBtn.classList.add('element__like-btn_active');
                }
            });
    }

    _addLike() {
        this._putLike(this._id)
            .then(() => {
                this._likeBtn.classList.add('element__like-btn_active');
            })
            .then(() => {
                this._likeCounter();
            });
    }

    _removeLike() {
        this._deleteLike(this._id)
            .then(() => {
                this._likeBtn.classList.remove('element__like-btn_active');
            })
            .then(() => {
                this._likeCounter();
            });
    }

    _likeBtnToggle() {
        this.chekLikeStatus(this._id, this._userId)
            .then((res) => {
                if (!res) {
                    this._addLike();
                } else {
                    this._removeLike();

                }
            });
    }

    _likeCounter() {
        this._chekLikeNumber(this._id)
            .then((res) => {
                this._likesNamberContainer.textContent = res;
            });

    }

    _setEventListeners() {

        this._likeBtn = this._element.querySelector('.element__like-btn');

        this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
            this._removeElement();
        });

        this._likeBtn.addEventListener('click', () => {
            this._likeBtnToggle();
        });

        this._elementImage.addEventListener(('click'), () => {
            this._handleCardClick(this._text, this._image);
        });
    }
}