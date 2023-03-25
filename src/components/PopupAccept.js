import Popup from "./Popup.js";

export default class PopupAccept extends Popup {
    constructor(containerSelector, { deleteElement }) {
        super(containerSelector);
        this._btn = this._popup.querySelector('.popup__save-btn');
        this._deleteElement = deleteElement;
    }

    setEventListenersSave(id, element) {
        super.setEventListeners();
        this._btn.addEventListener('click', () => {
            this._deleteElement(id, element, this._popup);
        });
    }

    open(id, element) {
        super.open();
        this.setEventListenersSave(id, element);
    }
}