import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from 'react-hook-form';

export default function AddPlacePopup(props) {

  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  const { register,
    formState: { errors } } = useForm({
      mode: "all",
    });

  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }

  function handleCardLinkChange(e) {
    setCardLink(e.target.value);
  }

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: cardName,
      link: cardLink
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="New place"
      buttonText="Save"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input className="popup__input popup__input_card_place" id="place-input" type="text" name="name"
        placeholder="Name" value={cardName ?? ""} onInput={handleCardNameChange} required 
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
      <span className="place-input-error error">{errors?.name && errors.name.message}</span>
      <input className="popup__input popup__input_card_link" id="link-input" type="url" name="link" placeholder="Url" 
        value={cardLink ?? ""} onInput={handleCardLinkChange} required 
        {...register('link', {
          required: 'This field can not be empty',
          pattern: {
            value: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,
            message: 'Please enter valid url',
          },
        })}
        />
      <span className="link-input-error error">{errors?.link && errors.link.message}</span>
    </PopupWithForm>
  );
}