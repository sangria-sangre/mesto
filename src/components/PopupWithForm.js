import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(containerSelector, {submitForm}) {
        super(containerSelector);
        this._popupSelector = containerSelector;
        this._inputList = Array.from(this._container.querySelectorAll('.popup__input'));
        this._popupForm = this._container.querySelector('.popup__form');
        this._submitForm = submitForm;
    }

    _getInputValues() {
        this._inputsValues = {};
        this._inputList.forEach((input)=>{
            this._inputsValues[input.name] = input.value;
        });
        return this._inputsValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._submitForm);
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}