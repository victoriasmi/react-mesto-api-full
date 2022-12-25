import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {

  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

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
      title="Новое место"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input className="popup__input popup__input_card_place" id="place-input" type="text" name="name"
        placeholder="Название" minLength="2" maxLength="30" value={cardName ?? ""} onChange={handleCardNameChange} required />
      <span className="place-input-error error"></span>
      <input className="popup__input popup__input_card_link" id="link-input" type="url" name="link" placeholder="Ссылка" 
        value={cardLink ?? ""} onChange={handleCardLinkChange} required />
      <span className="link-input-error error"></span>
    </PopupWithForm>
  );
}