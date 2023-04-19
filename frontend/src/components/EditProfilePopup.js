import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import { useForm } from 'react-hook-form';

export default function EditProfilePopup(props) {

  const [profileName, setProfileName] = useState("");
  const [profileDescription, setProfileDescription] = useState("");

  const { register,
    formState: { errors } } = useForm({
      mode: "all",
    });


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
      title="Edit profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Save"
    >
      <input className="popup__input popup__input_info_name" id="name-input" type="text" name="name" placeholder="Name"
        value={profileName ?? ""} onInput={handleProfileNameChange} required 
        {...register('name', {
          required: 'This field can not be empty',
          minLength: {
            value: 2,
            message: "Please enter at least 2 characters"
          },
          maxLength: {
            value: 30,
            message: "Please enter up to 30 characters"
          },
        })}
        />
      <span className="name-input-error error">{errors?.name && errors.name.message}</span>
      <input className="popup__input popup__input_info_occupation" id="occupation-input" type="text" name="about"
        placeholder="About" value={profileDescription ?? ""} onInput={handleProfileDescriptionChange} required
        {...register('about', {
          required: 'This field can not be empty',
          minLength: {
            value: 2,
            message: "Please enter at least 2 characters"
          },
          maxLength: {
            value: 30,
            message: "Please enter up to 30 characters"
          },
        })}
        />
      <span className="error occupation-input-error">{errors?.about && errors.about.message}</span>
    </PopupWithForm>
  );
}