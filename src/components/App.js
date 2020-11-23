import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then(
        (newCard) => {
          const newCards = cards.map((currentCard) => currentCard._id === card._id ? newCard : currentCard)
          setCards(newCards);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(
        () => {
          const newCards = cards.filter((elem) => elem !== card);
          setCards(newCards);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  React.useEffect(() => {
    api.getInitialData()
      .then(
        (data) => {
          const [userData, cardsData] = data;
          setCards(cardsData);
          setCurrentUser(userData);
        },
        (err) => {
          console.log(err);
        }
      )
  }, [])

  function handleAddPlaceSubmit(data, resetFieldsFn) {
    api.postCard(data)
      .then(
        (newCard) => {
          setCards([newCard, ...cards]);
          resetFieldsFn();
          closeAllPopups();
        },
        (err) => {
          console.log(err);
        }
      )
  }

  function handleUpdateAvatar(data, resetFieldsFn) {
    api.setUserAvatar(data)
      .then(
        (data) => {
          setCurrentUser(data);
          resetFieldsFn();
          closeAllPopups();
        },
        (err) => {
          console.log(err);
        }
      )
  }

  function handleUpdateUser(data, resetFieldsFn) {
    api.setUserInfo(data)
      .then(
        (data) => {
          setCurrentUser(data);
          resetFieldsFn();
          closeAllPopups();
        },
        (err) => {
          console.log(err);
        }
      )
  }

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
    setImagePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        onEditProfile={handleEditProfilePopupOpen}
        onAddPlace={handleAddPlacePopupOpen}
        onEditAvatar={handleEditAvatarPopupOpen}
        onCardClick={handleCardClick}
      />
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        currentUser={currentUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonText="Да"
      />
      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;