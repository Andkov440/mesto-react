import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
}

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <>
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm 
        name="edit" 
        title="Редактировать профиль"
        buttonTitle="Сохранить" 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
      >
        <label className="popup__label">
          <input type="text" className="popup__input popup__name" name="name" id="name" placeholder="Имя" minLength="2" maxLength="40" required />
          <span id="name-error" className="error"></span>
        </label>
        <label className="popup__label">
          <input type="text" className="popup__input popup__about" name="about" id="about" placeholder="Профессия" minLength="2" maxLength="200" required />
          <span id="about-error" className="error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonTitle="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__label">
          <input type="url" id="url-avatar" className="popup__input popup__url" name="avatar" placeholder="Ссылка на аватар" required />
          <span id="url-avatar-error" className="error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonTitle="Да"
        onClose={closeAllPopups}
      />
      <PopupWithForm
        name="add"
        title="Новое место" 
        buttonTitle="Создать" 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups}
      >
        <label className="popup__label">
          <input type="text" id="title" className="popup__input popup__caption" name="card-name" placeholder="Название" minLength="2" maxLength="30" required />
          <span id="title-error" className="error"></span>
        </label>
        <label className="popup__label">
          <input type="url" id="url-add" className="popup__input popup__url" name="card-link" placeholder="Ссылка на картинку" required />
          <span id="url-add-error" className="error"></span>
        </label>
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </>
  );
}
