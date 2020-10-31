import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import '../index.css';


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  function handleEditProfilePopupOpen() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlacePopupOpen() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarPopupOpen() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
  }

  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfilePopupOpen}
        onAddPlace={handleAddPlacePopupOpen}
        onEditAvatar={handleEditAvatarPopupOpen}
      />
      <Footer />
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        children={
          <>
            <input className="form__input" type="text" id="profile-name" aria-label="имя" placeholder="Имя" name="name" required minLength="2" maxLength="40" />
            <span className='form__input-error' id='profile-name-error'></span>
            <input className="form__input" type="text" id="profile-about" aria-label="подпись" placeholder="Подпись" name="about" required minLength="2" maxLength="200" />
            <span className='form__input-error' id='profile-about-error'></span>
          </>
        }
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        name="photo"
        title="Новое место"
        children={
          <>
            <input className="form__input" type="text" id="photo-title" aria-label="подпись" placeholder="Название" name="title" required minLength="1" maxLength="30" />
            <span className='form__input-error' id='photo-title-error' role="status" aria-live="polite"></span>
            <input className="form__input" type="url" id="photo-url" aria-label="ссылка" placeholder="Ссылка на картинку" name="url" required />
            <span className='form__input-error' id='photo-url-error' role="status" aria-live="polite"></span>
          </>
        }
        buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        children={
          <>
          </>
        }
        buttonText="Да"
      />
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        children={
          <>
            <input className="form__input" type="url" id="avatar-url" aria-label="ссылка" placeholder="Ссылка на картинку" name="url" required />
            <span className='form__input-error' id='avatar-url-error' role="status" aria-live="polite"></span>
          </>
        }
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />
      <ImagePopup />
      <template id="photos-element">
        <li className="photos__card">
          <figure className="photos__figure">
            <img alt="" className="photos__image" />
            <figcaption className="photos__figcaption"></figcaption>
          </figure>
          <button className="photos__delete-button" aria-label="удалить фотографию"></button>
          <div className="photos__like-container">
            <button className="photos__like-button" aria-label="поставить лайк"></button>
            <span className="photos__like-count">0</span>
          </div>
        </li>
      </template>
    </>
  );
}

export default App;