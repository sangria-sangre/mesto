import Popup from "./Popup.js";

export default class PopupAccept extends Popup {
    constructor(containerSelector, {deleteElement}) {
        super(containerSelector);
        this._btn = this._popup.querySelector('.popup__save-btn');
        this._deleteElement = deleteElement;
        this._dots = this._popup.querySelector('.popup__loading');
    }

    setEventListenersSave(id, element){
        this._btn.addEventListener('click', () => {
            this._renderLoading(true);
            this._deleteElement(id, element);
            this._renderLoading(true);
            this.close();
        });
    }

    open(id, element){
        super.open();
        this.setEventListenersSave(id, element);
    }

    _renderLoading(isLoading) {
        if (isLoading) {
            this._dots.classList.add('.popup__loading_active');
        } else {
            this._dots.classList.remove('.popup__loading_active');
        }
    }
}