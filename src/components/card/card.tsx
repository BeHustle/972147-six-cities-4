import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {CardType, HouseType} from '../../constants';
import {setActiveOfferId} from '../../reducer/app/app.reducer';

const IN_BOOKMARKS_CLASS = `place-card__bookmark-button--active`;

const getCardTypeClass = (type) => {
  switch (type) {
    case CardType.MAIN:
      return `cities__place-card`;
    case CardType.CARD_DETAIL:
      return `near-places__card`;
    case CardType.FAVORITE:
      return `favorites__card`;
    default:
      return ``;
  }
};

const getCardTypeImageClass = (type) => {
  switch (type) {
    case CardType.MAIN:
      return `cities__image-wrapper`;
    case CardType.CARD_DETAIL:
      return `near-places__image-wrapper`;
    case CardType.FAVORITE:
      return `favorites__image-wrapper`;
    default:
      return ``;
  }
};

const Card = ({
  onTitleClick,
  onCardHover,
  onFavoriteClick,
  cardType,
  offer: {id, name, price, image, type, isPremium, inBookmarks, rating},
}) => <article
  className={`place-card ${getCardTypeClass(cardType)}`}
  onMouseEnter={() => onCardHover(id)}
  onMouseLeave={() => onCardHover(null)}>

  {isPremium && <div className="place-card__mark">
    <span>Premium</span>
  </div>}
  <div className={`place-card__image-wrapper ${getCardTypeImageClass(cardType)}`}>
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
      <button onClick={(evt) => {
        evt.preventDefault();
        onFavoriteClick(id, +!inBookmarks);
      }} className={`place-card__bookmark-button button ${inBookmarks && IN_BOOKMARKS_CLASS}`} type="button">
        <svg className="place-card__bookmark-icon" width="18" height="19">
          <use xlinkHref="#icon-bookmark"/>
        </svg>
        <span className="visually-hidden">To bookmarks</span>
      </button>
    </div>
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={{width: `${Math.ceil(rating) * 20}%`}}/>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
    <h2 className="place-card__name">
      <a onClick={() => onTitleClick(id)} href="#">{name}</a>
    </h2>
    <p className="place-card__type">{type}</p>
  </div>
</article>;

Card.propTypes = {
  onTitleClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  cardType: PropTypes.string.isRequired,
  offer: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.oneOf(HouseType).isRequired,
    isPremium: PropTypes.bool.isRequired,
    inBookmarks: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    rooms: PropTypes.string.isRequired,
    guests: PropTypes.string.isRequired,
    facilities: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.exact({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      isSuper: PropTypes.bool.isRequired
    }).isRequired,
    text: PropTypes.arrayOf(PropTypes.string).isRequired,
    cityId: PropTypes.number.isRequired
  }),
  onFavoriteClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onCardHover(id) {
    dispatch(setActiveOfferId(id));
  },
});

export {Card};

export default connect(null, mapDispatchToProps)(Card);
