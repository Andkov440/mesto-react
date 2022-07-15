import React from 'react';
import Card from './Card';
import avatar from '../img/kusto.jpg';
import {api}  from '../utils/api.js';

export default function Main(props) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState(avatar);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userData, cards]) => {
            setUserName(userData.name);
            setUserDescription(userData.about);
            setUserAvatar(userData.avatar);
            setCards([...cards]);
        })
        .catch((err) => {
            console.log(err);
        });
  }, []);
  
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar}>
          <img className="profile__picture" src={userAvatar} alt="Аватар" />
          <div className="profile__overlay"></div>
        </div>
        <div className="profile__wrapper">
          <h1 className="profile__title">{userName}</h1>
          <button type="button" className="profile__edit button" onClick={props.onEditProfile}></button>
        </div>
        <p className="profile__subtitle">{userDescription}</p>
        <button type="button" className="profile__add button" onClick={props.onAddPlace}></button>
      </section>
      <section className="photo">{cards.map(item =>
        <figure className="photo__item" key={item._id}>
          <Card 
            card={item}
            name={item.name}
            link={item.link}
            likes={item.likes.length}
            onCardClick={props.onCardClick}/>
        </figure>)}
      </section>
  </main>
  );
}