import './index.css';
import {
    validationConfig, elementsCase, elementTemplate, profileInfo, dots,
    profileBtnEdit, profileTitleInput, profileSubtitleInput, profileBtnAdd,
    apiUrl, apiHeaders, userPhotoCase, userPhotoEdit
} from '../utils/constants.js';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupAccept from '../components/PopupAccept';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api';

//Api
const api = new Api(apiUrl, apiHeaders);

//Активация валидации
const formValidators = {}

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('name');

        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(validationConfig);

// popupImage
const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();

const handleCardClick = (text, image) => {
    popupImage.open(text, image);
}

//Cards
//createCard
const createCard = (item, userId) => {
    const card = new Card(item, elementTemplate, handleCardClick,
        userId, popupDelete, putLike, deleteLike, chekLikeNumber, chekLikeStatus);
    return card.generadeCard();
}

//display Card
const defaultCardList = new Section({
    renderer: () => {
        Promise.all([api.getCard(), api.getUserInfo()])
            .then(([items, user]) => {
                items.forEach((item) => {
                    const cardElement = createCard(item, user._id);
                    defaultCardList.addItem(cardElement);
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }
}, elementsCase);

defaultCardList.renderItems();

//delete Card
const popupDelete = new PopupAccept('.popup_delete-item',
    {
        deleteElement: (id, element) => {
            return api.deleteCard(id)
                .then(() => {
                    element.remove();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

popupDelete.setEventListeners();

//add and remove like
const putLike = (id) => {
    return api.putLike(id);
}

const deleteLike = (id) => {
    return api.deletetLike(id);
}

const chekLikeNumber = (id) => {
    return api.getCard()
        .then((res) => {
            return res.find(element => {
                return element._id === id;
            });
        }).then((res) => {
            return res.likes.length;
        });
}

const chekLikeStatus = (id, userId) => {
    return api.getCard()
        .then((res) => {
            return res.find(element => {
                return element._id === id;
            });
        }).then((res) => {
            return res.likes.some(element => {
                return element._id === userId;
            });
        });
}

//profileInfo
api.getUserInfo().then(items => {
    document.querySelector('.profile__title').textContent = items.name;
    document.querySelector('.profile__subtitle').textContent = items.about;
})
    .catch((err) => {
        console.log(err);
    });

//profileInfo edit
userPhotoEdit.addEventListener('click', () => {
    formValidators['avatar-update'].resetValidation();
    popupEditImageProfile.open();
})

//profileImage edit
const popupEditImageProfile = new PopupWithForm('.popup_avatar-update', {
    submitForm: (data) => {
        api.postUserPhoto(data).then(item => {
            userPhotoCase.src = item.avatar;
        })
            .catch((err) => {
                console.log(err);
            });
    }
});

popupEditImageProfile.setEventListeners();

//profileImage get
api.getUserPhoto().then(item => {
    userPhotoCase.src = item.avatar;
})
    .catch((err) => {
        console.log(err);
    });

//profileForm
const userInfo = new UserInfo(profileInfo);

profileBtnEdit.addEventListener('click', function () {
    const user = userInfo.getUserInfo();
    profileTitleInput.value = user.name;
    profileSubtitleInput.value = user.about;
    formValidators['profile-edit'].resetValidation();
    popupWithFormProfile.open();
});

const popupWithFormProfile = new PopupWithForm('.popup_profile', {
    submitForm: (data) => {
        api.postUserInfo(data).then(items => {
            userInfo.setUserInfo(items);
        })
            .catch((err) => {
                console.log(err);
            });
    }
});

popupWithFormProfile.setEventListeners();

//ItemForm
const popupWithFormItem = new PopupWithForm('.popup_item', {
    submitForm: (item) => {
        api.postCard(item).then((item) => {
            const cardElement = createCard(item, item.owner._id);
            defaultCardList.addItemAfterPost(cardElement);
        })
            .catch((err) => {
                console.log(err);
            });
    }
});

popupWithFormItem.setEventListeners();

profileBtnAdd.addEventListener('click', function () {
    formValidators['new-item'].resetValidation();
    popupWithFormItem.open();
});