export default class UserInfo {
    constructor({ name, about }) {
        this._userName = document.querySelector(name);
        this._userAbout = document.querySelector(about);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userAbout.textContent
        }
    }

    setUserInfo(data) {
        if(data.name && data.about){
        this._userName.textContent = data.name;
        this._userAbout.textContent = data.about;
    } else {
        alert('Произошла ошибка');
    }
    }
}