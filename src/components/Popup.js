export default class Popup {
    constructor(containerSelector) {
        this._container = document.querySelector(containerSelector);
    }

    open() {
        this._container.classList.add('popup_opened');
        document.addEventListener('keydown', (e) => this._handleEscClose(e));
    }

    close() {
        this._container.classList.remove('popup_opened');
        document.removeEventListener('keydown', (e) => this._handleEscClose(e));
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
        this._container.addEventListener('click', (e) => {
            this._closePopupOverlay(e);
        });
    }
}