import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {

  const avatar = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatar.current.value
    });
  }

  useEffect(() => {
    avatar.current.value = ("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="editAvatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input className="popup__input popup__input_avatar_link" id="avatar-link-input" type="url" name="link"
        placeholder="Ссылка" ref={avatar} required />
      <span className="avatar-link-input-error error"></span>
    </PopupWithForm>
  );
}