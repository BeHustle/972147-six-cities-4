import PropTypes from 'prop-types';
import React from 'react';
import {CardType, HouseType} from '../../constants.js';
import Card from '../card/card.jsx';

const getOffersByCityId = (offers, cityId) => offers.filter((offer) => offer.cityId === cityId);

const FavoritesList = ({offers, cities, onFavoriteClick, onCardTitleClick}) =>
  <ul className="favorites__list">
    {cities.map((city) =>
      getOffersByCityId(offers, city.id).length
        ? <li key={city.id} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city.name}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {getOffersByCityId(offers, city.id).map((offer) =>
              <Card
                key={offer.id}
                onCardHover={() => {}}
                onFavoriteClick={onFavoriteClick}
                onTitleClick={onCardTitleClick}
                offer={offer}
                cardType={CardType.FAVORITE}
              />)}
          </div>
        </li>
        : ``
    )}
  </ul>;

FavoritesList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.exact({
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
  })),
  cities: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired
  })),
  onFavoriteClick: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired
};

export default FavoritesList;
