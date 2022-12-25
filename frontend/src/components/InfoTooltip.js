import React from 'react';
import iconSuccess from '../images/successConfirmation.png';
import iconSmthSentWrong from '../images/smthWentWrong.png';

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {

  return (
    <div className={`popup popup_type_info-tool-tip ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <form className="popup__form popup__form_type_info-tool-tip" name="name">
          <img
            className="popup__icon"
            src={isSuccess ? iconSuccess : iconSmthSentWrong }
            alt={isSuccess ? "Успех" : "Неудача" }
          />
          <p className="popup__title popup__title_type_info-tool-tip">
            {isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}
          </p>
        </form>
      </div>
    </div>
  )
}