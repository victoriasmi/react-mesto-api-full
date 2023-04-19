import React, { useState, useEffect, useContext } from 'react';
import iconSuccess from '../images/successConfirmation.png';
import iconSmthSentWrong from '../images/smthWentWrong.png';

export default function InfoTooltip({ isOpen, onClose, isSuccess, updateErr }) {

  const [errText, setErrText] = useState("");

  function checkErrText(){
    if (updateErr.includes(409)){
      setErrText("Email already exists");
    } else if(updateErr.includes(401)){
      setErrText("No such user");
    }
    else setErrText("Something went wrong, please try again.");
  };

  useEffect(() => {
    checkErrText();
    console.log(updateErr);
  }, [updateErr]);


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
            {isSuccess ? "Successfully registered!" : errText}
          </p>
        </form>
      </div>
    </div>
  )
}