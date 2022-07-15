export const initialCards = [
  {
    title: 'Архыз',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const profileEditButton = document.querySelector('.profile__edit');
export const profileAddButton = document.querySelector('.profile__add');
export const profileAvatarButton = document.querySelector('.profile__avatar');
export const formEditElement = document.querySelector('.popup__form_edit');
export const formAddElement = document.querySelector('.popup__form_add');
export const formAvatarElement = document.querySelector('.popup__form_avatar');
export const titleInput = document.querySelector('.popup__name');
export const descriptionInput = document.querySelector('.popup__about');

export const validationParameters = {
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_error',
  inputSelector: '.popup__input',
  errorClass: 'error'
};

export const serverConfig = {
  url: 'https://mesto.nomoreparties.co/v1',
  token: '59d02e65-9b66-42b8-b565-cabf1c3f916f',
  cohort: 'cohort-44'
};
