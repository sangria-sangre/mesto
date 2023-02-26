import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(containerSelector) {
        super(containerSelector);
        this._popupTitleImage = document.querySelector('.popup__title_image');
        this._picture = this._container.querySelector('.popup__picture');
    }

    open(text, image) {
        super.open();
        this._picture.src = image;
        this._picture.alt = text;
        this._popupTitleImage.textContent = text;
    }

}