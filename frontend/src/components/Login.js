import React, { useState } from 'react';
import InfoTooltip from './InfoTooltip';
import { useForm } from 'react-hook-form';


export default function Login(props) {

  const { register, handleSubmit,
    formState: { errors } } = useForm({
      mode: "all",
    });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleLogin(e) {
    // e.preventDefault();
    props.onLogin(email, password)
  }

  return (
    <>
      <InfoTooltip
        isOpen={props.isOpen}
        onClose={props.onClose}
        isSuccess={props.isSuccess}
        updateErr={props.updateErr}
      />
      <div className="starter-page">
        <p className="popup__title popup__title_type_starter-page">Log in</p>
        <form className="popup__form popup__form_type_starter-page" onSubmit={handleSubmit(handleLogin)} noValidate>
          <input className="popup__input popup__input_type_starter-page" id="email-input" type="email" name="name"
            placeholder="Email" value={email ?? ""} onInput={handleEmailChange}
            {...register('email', {
              required: 'This field can not be empty',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Please enter valid email address',
              },
            })}
          />
          <span className="email-input-error error">{errors?.email && errors.email.message}</span>
          <input className="popup__input popup__input_type_starter-page" id="password-input" type="password" name="password" placeholder="Password"
            value={password ?? ""} onInput={handlePasswordChange}
            {...register('password', {
              required: 'This field can not be empty',
            })}
          />
          <span className="password-input-error error">{errors?.password && errors.password.message}</span>
          <button className="popup__save popup__save_type_starter-page" type="submit">Log in</button>
        </form>
      </div>
    </>
  )
}