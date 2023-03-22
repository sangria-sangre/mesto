import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(containerSelector, { submitForm }) {
        super(containerSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._submitForm = submitForm;
        this._dots = this._popupForm.querySelector('.popup__save-btn_dots');
    }

    _getInputValues() {
        this._inputsValues = {};
        this._inputList.forEach((input) => {
            this._inputsValues[input.name] = input.value;
        });
        return this._inputsValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._renderLoading(true);
            this._submitForm(this._getInputValues());
            this._renderLoading(false);
            this.close();
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    _renderLoading(isLoading) {
        if (isLoading) {
            this._dots.classList.add('.popup__save-btn_dots_visible');
        } else {
            this._dots.classList.remove('.popup__save-btn_dots_visible');
        }
    }
}