import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import { auth } from '../utils/auth';

export default function App() {
  const [currentUser, setCurrentUser] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();

  function handleRegisterSubmit(email, password) {
    auth.register(email, password)
      .then(() => {
        // localStorage.removeItem("token");
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        history.push('/signin');
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      })
  }

  function handleLoginSubmit(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          // console.log(localStorage.getItem("token"));
          // console.log(res.token);
          // console.log(email);
          setEmail(email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      })
  }

  // useEffect(() => {
  //   if (loggedIn) {
  //     const token = localStorage.getItem("token");
  //     console.log(token);
  //     if (token) {
  //       authInfo();
  //     }
  //   }
  // }, [])

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log(token);
  //   if (token) {
  //     auth.getInfo()
  //       .then((data) => {
  //         console.log(data);
  //         console.log(data.data.email);
  //         // setEmail(data.data.email);
  //         // setLoggedIn(true);
  //         // console.log(loggedIn);
  //         history.push('/');
  //         console.log('checkTokenActivate');
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //   }
  // }, [loggedIn])

  // function checkToken() {
  //   auth.getInfo()
  //     .then((data) => {
  //       console.log(data);
  //       console.log(data.data.email);
  //       setEmail(data.data.email);
  //       setLoggedIn(true);
  //       console.log(loggedIn);
  //       history.push('/');
  //       console.log('checkTokenWorked');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }

  // useEffect(() => {
  //   if (loggedIn) {
  //     history.push("/");
  //   }
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authInfo(token);
    }
  }, [])

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  function authInfo(token) {
    auth.getInfo(token)
      .then((data) => {
        setEmail(data.data.email);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    // if (loggedIn) {
      api.getInitialCards()
        .then((cardsData) => {
          console.log(cardsData.data);
          setCards(cardsData.data);
          console.log(loggedIn);
        })
        .catch((err) => {
          console.log(err);
        });
    // }
  }, [loggedIn])

  useEffect(() => {
    // if (loggedIn) {
      api.getProfileInfo()
        .then((userData) => {
          console.log(userData.data);
          setCurrentUser(userData.data);
          console.log(loggedIn);
        })
        .catch((err) => {
          console.log(err);
        });
    // }
  }, [loggedIn]);


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleUpdateUser(input) {
    api.editProfileInfo(input)
      .then((data) => {
        console.log(data);
        console.log(data.data);
        setCurrentUser(data.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => console.log(i) === console.log(currentUser._id));
    // console.log(card.likes);
    // console.log(card._id);
    api.changeLikeCard(card._id, !isLiked).then((newCard) => {
      return setCards((state) => state.map((c) => c._id === card._id ? newCard.card : c));
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    console.log(card._id);
    api.deleteCard(card._id).then(() => {
      console.log(card._id);
      setCards((state) => state.filter(c => { return c._id !== card._id }))
        .catch((err) => {
          console.log(err);
        })
    });
  }

  function handleAddPlaceSubmit(input) {
    api.createCard(input)
      .then((newCard) => {
        console.log(newCard.data);
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/signup">
            <Header
              email={email}
            />
            <Register
              onRegister={handleRegisterSubmit}
              isOpen={isInfoTooltipOpen}
              isSuccess={isSuccess}
              onClose={closeAllPopups}
            />
            <Footer />
          </Route>

          <Route path="/signin">
            <Header
              email={email}
            />
            <Login
              onLogin={handleLoginSubmit}
              isOpen={isInfoTooltipOpen}
              isSuccess={isSuccess}
              onClose={closeAllPopups}
            />
            <Footer />
          </Route>

          <Route path="/" >
            <Header
              email={email}
            />
            <Main
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}
            />
            <ProtectedRoute path="/" loggedIn={loggedIn} component={Footer} />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

