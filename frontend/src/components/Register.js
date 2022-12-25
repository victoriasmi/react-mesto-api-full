import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

export default function Register(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleRegister(e) {
    e.preventDefault();
    props.onRegister(email, password)
  }

  return (
    <>
      <InfoTooltip
        isOpen={props.isOpen}
        onClose={props.onClose}
        isSuccess={props.isSuccess}
      />
      <div className="starter-page">
        <p className="popup__title popup__title_type_starter-page">Регистрация</p>
        <form className="popup__form popup__form_type_starter-page" onSubmit={handleRegister} noValidate>
          <input className="popup__input popup__input_type_starter-page" id="email-input" type="email" name="email"
            placeholder="Email" minLength="2" maxLength="30" value={email ?? ""} onChange={handleEmailChange} required />
          <span className="email-input-error error"></span>
          <input className="popup__input popup__input_type_starter-page" id="password-input" type="password" name="password" placeholder="Пароль"
            value={password ?? ""} onChange={handlePasswordChange} required />
          <span className="password-input-error error"></span>
          <button className="popup__save popup__save_type_starter-page" type="submit">Зарегистрироваться</button>
          <div className="starter-page__signin">
            <p className="starter-page__signin-text">Уже зарегистрированы?&nbsp;</p>
            <Link to="/signin" className="starter-page__signin-link">Войти</Link>
          </div>
        </form>
      </div>
    </>
  );

}