import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  console.log(props.card.owner);
  console.log(props.card);
  console.log(currentUser._id);
  console.log(props.card.likes);
  console.log(props.likes);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  // console.log(props.data.card.likes);
  // console.log(props.card.data.likes);

  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button_active' : 'element__delete-button'}`
  );

  const cardLikeButtonClassName = (
    `element__like-button ${isLiked ? 'element__like-button_active' : 'element__like-button'}`
  );

  return (
    <li className="element">
      <div className="element__top">
        <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
        <img className="element__image" src={props.card.link} alt={props.card.title} onClick={handleClick} />
      </div>
      <div className="element__bottom">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-block">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="element__like-array">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}