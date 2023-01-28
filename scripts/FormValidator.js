export default class FormValidator {
    constructor(config, inputElement) {
        this._config = config;
        this._inputElement = inputElement;
        this._formElement = this._inputElement.closest('form');
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    //Показать сообщение об ошибке

    _showInputError() {
        const errorElement = document.querySelector(`.${this._inputElement.id}-error`);

        errorElement.classList.add(this._config.errorClass);
        errorElement.textContent = this._inputElement.validationMessage;
        this._inputElement.classList.add(this._config.inputErrorClass);
    }

    //Cкрыть сообщение об ошибке

    _hideInputError() {
        const errorElement = document.querySelector(`.${this._inputElement.id}-error`);

        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
        this._inputElement.classList.remove(this._config.inputErrorClass);
    }

    //Проверка инпута
    //Если есть инпут с ошибкой, показать ошибку, и наоборот

    _checkInputValidity() {

        if (this._inputElement.validity.valid) {
            this._hideInputError();
        } else {
            this._showInputError();
        }
    }

    //Проверка всех инпутов на ошибку

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    //Активация или дизактивация кнопки по результатам проверки инпутов

    _toggleButtonState() {

        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    //Повесить обработчик на все инпуты

    _setEventListeners() {
        
        this._toggleButtonState();
        this._inputElement.addEventListener('input', () => {
            this._checkInputValidity();
            this._toggleButtonState();
        });
        
    }

    //Повесить обработчик на элемент

    enableValidation() {
        this._setEventListeners();
    }

}

