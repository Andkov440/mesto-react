import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from "../components/PopupConfirm.js";
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api.js";

import {
    validationParameters,
    profileAddButton,
    profileEditButton,
    profileAvatarButton,
    titleInput,
    descriptionInput,
    formEditElement,
    formAddElement,
    formAvatarElement,
    serverConfig } from '../utils/constants.js';

import './index.css';

const api = new Api({
  url: `${serverConfig.url}/${serverConfig.cohort}`,
  headers: {
    "Content-type": "application/json",
    authorization: `${serverConfig.token}`,
  },
});

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__picture');
const zoomPopup = new PopupWithImage('.popup-picture');
const popupConfirm = new PopupConfirm(handleDeleteCard, '.popup_confirm');
const popupFormEdit = new PopupWithForm(handleSaveProfile, '.popup_edit');
const popupFormAvatar = new PopupWithForm(handleChangeAvatar, '.popup_avatar');
const popupFormAdd = new PopupWithForm(handleCreateNewCard, '.popup_add');

const createNewCard = function createNewCard(data) {
  const card = new Card(data, '#photo__template', {
    handleCardClick,
    handleLikeCard,
    handleDislikeCard,
    handleDelete: popupConfirm.open });
  const cardElement = card.generateCard(userInfo.getId());

  return cardElement;
}

const cardsContainer = new Section((card) => {
  cardsContainer.addItem(createNewCard(card));
}, '.photo');

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardsContainer.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

function editProfile() {
  const profileData = userInfo.getUserInfo();
  titleInput.value = profileData.name;
  descriptionInput.value = profileData.about;
  popupFormEdit.open();
}

function handleSaveProfile(evt, inputsValues) {
  evt.preventDefault();
  popupFormEdit.setSubmitText('Сохранение...');

  api
    .patchUserInfo(inputsValues['name'], inputsValues['about'])
    .then((res) => {
      userInfo.setUserInfo(res);
      popupFormEdit.close();
    })
    .finally(() => {
      popupFormEdit.setSubmitText('Сохранить');
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleChangeAvatar(evt, inputsValues) {
  evt.preventDefault();
  popupFormAvatar.setSubmitText('Сохранение...');

  api
    .changeAvatar(inputsValues['avatar'])
    .then((res) => {
      userInfo.setUserInfo(res);
      popupFormAvatar.close();
    })
    .finally(() => {
      popupFormAvatar.setSubmitText('Сохранить');
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleCreateNewCard(evt, inputsValues) {
  evt.preventDefault();
  popupFormAdd.setSubmitText("Сохранение...");

  api
    .postCard(inputsValues["card-name"], inputsValues["card-link"])
    .then((card) => {
      cardsContainer.addItem(createNewCard(card));
      popupFormAdd.close();
    })
    .finally(() => {
      popupFormAdd.setSubmitText("Создать");
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleCardClick(cardname, link) {
  zoomPopup.open(cardname, link);
}

function handleLikeCard(card) {

  api
    .likeCard(card.getId())
    .then((newCard) => {
      card.updCardLike(newCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDislikeCard(card) {
  api
    .dislikeCard(card.getId())
    .then((newCard) => {
      card.updCardLike(newCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeleteCard(card) {
  api
    .deleteCard(card.getId())
    .then(() => {
      card.removeCard();
      popupConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

profileEditButton.addEventListener('click', () => {
  validateEditProfileForm.resetValidation();
  editProfile();
});

profileAvatarButton.addEventListener('click', () => {
  validateEditAvatarForm.resetValidation();
  popupFormAvatar.open();
});

profileAddButton.addEventListener('click', () => {
  validateAddCardForm.resetValidation();
  popupFormAdd.open();
});

const validateEditProfileForm = new FormValidator(validationParameters, formEditElement);
const validateAddCardForm = new FormValidator(validationParameters, formAddElement);
const validateEditAvatarForm = new FormValidator(validationParameters, formAvatarElement);

validateEditProfileForm.enableValidation();
validateAddCardForm.enableValidation();
validateEditAvatarForm.enableValidation();

popupFormEdit.setEventListeners();
popupFormAdd.setEventListeners();
popupFormAvatar.setEventListeners();
popupConfirm.setEventListeners();
zoomPopup.setEventListeners();
