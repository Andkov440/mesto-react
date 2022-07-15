export default function Card(props) {
  
  function handleClick() {
    props.onCardClick(props.card);
  }  

  return (
    <>
      <img className="photo__image" src={props.link} alt={props.name} onClick={handleClick}/>
      <figcaption className="photo__caption">
        <h2 className="photo__title">{props.name}</h2>
        <div className="photo__like-wrapper">
          <button type="button" className="photo__like button"></button>
          <p className="photo__like-count">{props.likes}</p>
        </div>
      </figcaption>
      <button type="button" className="photo__trashbin button"></button>
    </>
  );
}