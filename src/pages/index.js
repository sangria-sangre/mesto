import './index.css';
import {
    validationConfig, elementsCase, elementTemplate, profileInfo,
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

//Cards
//createCard
const createCard = (item, currentUserId) => {
    const card = new Card(
        {
            data: {
                currentUserId: currentUserId,
                card: item,
                cardId: item._id,
                cardOwner: item.owner._id,
                cardText: item.name,
                cardImage: item.link,
                cardLikes: item.likes
            },
            handleCardClick: (text, image) => {
                popupImage.open(text, image);
            },
            handleLikeClick: (item, currentUserId) => {
                api.getCard()
                    .then((res) => {
                        return res.find(card => {
                            return card._id === item._id;
                        });
                    })
                    .then((resCard) => {
                        const isLike = resCard.likes.some(user => user._id === currentUserId);
                        if (isLike) {
                            api.deletetLike(resCard._id)
                                .then((res) => {
                                    card.updateLikes(res.likes);
                                })
                                .catch(() => {
                                    console.log(err);
                                });
                        } else {
                            api.putLike(resCard._id)
                                .then((res) => {
                                    card.updateLikes(res.likes);
                                })
                                .catch(() => {
                                    console.log(err);
                                });
                        }
                    })
                    .catch(() => {
                        console.log(err);
                    });
            },
            handleDeleteIconClick: (item) => {
                card.removeElement(item._id, popupDelete);
            }
        }, elementTemplate);
    return card.generadeCard();
}

//display Card
const defaultCardList = new Section(elementsCase, {
    render: (items, userId) => {
        items.forEach((item) => {
            const cardElement = createCard(item, userId);
            defaultCardList.addItem(cardElement);
        })
    }
});

api.getAllData()
    .then(([items, user]) => {
        defaultCardList.renderItems(items, user._id);
    })
    .catch((err) => {
        console.log(err);
    });

//delete Card
const popupDelete = new PopupAccept('.popup_delete-item',
    {
        deleteElement: (id, element, popup) => {
            renderLoading(true, popup);
            api.deleteCard(id)
                .then(() => {
                    element.remove();
                })
                .then(() => {
                    popupDelete.close();
                })
                .then(() => {
                    renderLoading(false, popup);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    });

popupDelete.setEventListeners();

//profileInfo
api.getUserInfo().then(items => {
    userInfo.setUserInfo(items);
    userPhotoCase.src = items.avatar;
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
    submitForm: (data, popup) => {
        renderLoading(true, popup);
        api.postUserPhoto(data)
            .then(item => {
                userPhotoCase.src = item.avatar;
            })
            .then(() => {
                popupEditImageProfile.close();
            })
            .then(() => {
                renderLoading(false, popup);
            })
            .catch((err) => {
                console.log(err);
            })
    }
});

popupEditImageProfile.setEventListeners();

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
    submitForm: (data, popup) => {
        renderLoading(true, popup);
        api.postUserInfo(data)
            .then(items => {
                userInfo.setUserInfo(items);
            })
            .then(() => {
                popupWithFormProfile.close();
            })
            .then(() => {
                renderLoading(false, popup);
            })
            .catch((err) => {
                console.log(err);
            })
    }
});

popupWithFormProfile.setEventListeners();

//ItemForm
const popupWithFormItem = new PopupWithForm('.popup_item', {
    submitForm: (item, popup) => {
        renderLoading(true, popup);
        api.postCard(item)
            .then((item) => {
                const cardElement = createCard(item, item.owner._id);
                defaultCardList.addItemAfterPost(cardElement);
            })
            .then(() => {
                popupWithFormItem.close();
            })
            .then(() => {
                renderLoading(false, popup);
            })
            .catch((err) => {
                console.log(err);
            })
    }
});

popupWithFormItem.setEventListeners();

profileBtnAdd.addEventListener('click', function () {
    formValidators['new-item'].resetValidation();
    popupWithFormItem.open();
});

function renderLoading(isLoading, popup) {
    const btn = popup.querySelector('.popup__btn-default-name');
    const loading = popup.querySelector('.popup__loading');
    if (isLoading) {
        btn.classList.add('popup__btn-default-name_disable');
        loading.classList.add('popup__loading_active');
    } else {
        btn.classList.remove('popup__btn-default-name_disable');
        loading.classList.remove('popup__loading_active')
    }
}