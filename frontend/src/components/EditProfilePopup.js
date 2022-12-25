import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup(props) {

  const [profileName, setProfileName] = useState("");
  const [profileDescription, setProfileDescription] = useState("");

  function handleProfileNameChange(e) {
    setProfileName(e.target.value);
  }

  function handleProfileDescriptionChange(e) {
    setProfileDescription(e.target.value);
  }

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setProfileName(currentUser.name);
    setProfileDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: profileName,
      about: profileDescription,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input className="popup__input popup__input_info_name" id="name-input" type="text" name="name" placeholder="Имя"
        minLength="2" maxLength="40" value={profileName ?? ""} onChange={handleProfileNameChange} required />
      <span className="name-input-error error"></span>
      <input className="popup__input popup__input_info_occupation" id="occupation-input" type="text" name="about"
        placeholder="О Себе" minLength="2" maxLength="200" value={profileDescription ?? ""} onChange={handleProfileDescriptionChange} required />
      <span className="error occupation-input-error"></span>
    </PopupWithForm>
  );
}