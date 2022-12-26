import React from 'react';
import Card from './Card';
import editAvatarPic from "../images/edit_button.svg"
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {
console.log(props.cards);
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info-block">
          <div className="profile__info">
            <div className="profile__pic" style={{ backgroundImage: `url(${currentUser.avatar})`}} alt="аватар" ></div>
            <img className="profile__pic-edit" src={editAvatarPic} alt="изменить" onClick={props.onEditAvatar} />
          </div>
          <div className="profile__text">
            <div className="profile__edit">
              <h1 className="profile__name">{currentUser.name}</h1><button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__occupation">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace} ></button>
      </section>
      <ul className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))
        }
      </ul>
    </main>
  );

}


