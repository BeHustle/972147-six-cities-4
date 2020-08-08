import PropTypes from 'prop-types';
import React from 'react';
import {HouseType} from '../../constants.js';

const getOffersByCityId = (offers, cityId) => offers.filter((offer) => offer.cityId === cityId);

const IN_BOOKMARKS_CLASS = `place-card__bookmark-button--active`;

const FavoritesList = ({offers, cities, onFavoriteClick}) =>
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
            {getOffersByCityId(offers, city.id)
              .map((offer) =>
                <article key={offer.id} className="favorites__card place-card">
                  <div className="favorites__image-wrapper place-card__image-wrapper">
                    <a href="#">
                      <img className="place-card__image" src={offer.image} width="150" height="110" alt={offer.name} />
                    </a>
                  </div>
                  <div className="favorites__card-info place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{offer.price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                      </div>
                      <button onClick={(evt) => {
                        evt.preventDefault();
                        onFavoriteClick(offer.id, +!offer.inBookmarks);
                      }} className={`place-card__bookmark-button button ${offer.inBookmarks && IN_BOOKMARKS_CLASS}`} type="button">
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                          <use xlinkHref="#icon-bookmark" />
                        </svg>
                        <span className="visually-hidden">In bookmarks</span>
                      </button>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{width: `${Math.ceil(offer.rating) * 20}%`}}/>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <a href="#">{offer.name}</a>
                    </h2>
                    <p className="place-card__type">{offer.type}</p>
                  </div>
                </article>
              )}
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
  onFavoriteClick: PropTypes.func.isRequired
};

export default FavoritesList;
