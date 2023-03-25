import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(containerSelector, { submitForm }) {
        super(containerSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._submitForm = submitForm;
        this._dots = this._popupForm.querySelector('.popup__loading');
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
            this._submitForm(this._getInputValues(), this._popupForm);
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}