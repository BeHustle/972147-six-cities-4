import React from 'react';
import PropTypes from 'prop-types';
import {CARD_TYPES} from '../../constants';

const Card = (props) => {
  const {offer, onTitleClick, onCardHover} = props;
  const {id, name, price, image, type, isPremium, inBookmarks, rating} = offer;
  const bookmarksBtnClass = inBookmarks ? `place-card__bookmark-button button` : `place-card__bookmark-button place-card__bookmark-button--active button`;
  const ratingWidth = `${rating * 20}%`;
  return (<article
    className="cities__place-card place-card"
    onMouseEnter={() => onCardHover(id)}
    onMouseLeave={() => onCardHover(null)}>

    {isPremium && <div className="place-card__mark">
      <span>Premium</span>
    </div>}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={image} width="260" height="200" alt="Place image"/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={bookmarksBtnClass} type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"/>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: ratingWidth}}/>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a onClick={onTitleClick} href="#">{name}</a>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>);
};

Card.propTypes = {
  onTitleClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  offer: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.oneOf(CARD_TYPES),
    isPremium: PropTypes.bool.isRequired,
    inBookmarks: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number)
  }),
};

export default Card;
