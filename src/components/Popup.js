export default class Popup {
    constructor(containerSelector) {
        this._popup = document.querySelector(containerSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();

        }
    }

    _closePopupOverlay(evt) {
        if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-btn')) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (e) => {
            this._closePopupOverlay(e);
        });
    }
}