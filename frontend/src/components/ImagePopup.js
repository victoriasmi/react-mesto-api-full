export default function ImagePopup(props) {
  return (
    <div className={`popup popup_type_pic ${props.card.link && "popup_opened"}`}>
      <div className="popup__container popup__container_type_pic">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card.link} alt="" />
        <p className="popup__subtitle">{props.card.name}</p>
      </div>
    </div>
  );
}

