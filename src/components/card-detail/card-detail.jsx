import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {DEFAULT_AVATAR, CARD_TYPE, NEAR_PLACES_COUNT} from '../../constants.js';
import CardList from '../card-list/card-list.jsx';
import {Operation} from '../../reducer/reducer.js';
import Header from '../header/header.jsx';
import Reviews from '../reviews/reviews.jsx';
import Map from '../map/map.jsx';

const SUPER_USER_CLASS = `property__avatar-wrapper--pro`;
const IN_BOOKMARKS_CLASS = `property__bookmark-button--active`;

const CardDetail = ({offers, nearbyOffers, offerId, onCardTitleClick, onCardDetailLoad}) => {
  const {
    id, images, name, price, isPremium, type, inBookmarks,
    rooms, guests, facilities, author, text, rating, coordinates
  } = offers.find((it) => it.id === offerId);
  onCardDetailLoad(id);
  return <div className="page">

    <Header />

    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {images.map((image, index) =>
              <div className="property__image-wrapper" key={`img_${id}_${index}`}>
                <img className="property__image" src={image} alt={name} />
              </div>
            )}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {isPremium && <div className="property__mark">
              <span>Premium</span>
            </div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {name}
              </h1>
              <button className={`property__bookmark-button button ${inBookmarks && IN_BOOKMARKS_CLASS}`} type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"/>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${Math.ceil(rating) * 20}%`}}/>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {rooms}
              </li>
              <li className="property__feature property__feature--adults">
                {guests}
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {facilities.map((item, index) =>
                  <li key={`facility_${id}_${index}`} className="property__inside-item">{item}</li>
                )}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className={`property__avatar-wrapper user__avatar-wrapper ${author.isSuper && SUPER_USER_CLASS}`}>
                  <img className="property__avatar user__avatar" src={author.avatar || DEFAULT_AVATAR} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {author.name}
                </span>
              </div>
              <div className="property__description">
                {text.map((item, index) =>
                  <p key={`text_${id}_${index}`} className="property__text">{item}</p>
                )}
              </div>
            </div>
            <Reviews offerId={id} />
          </div>
        </div>
        <Map
          type={CARD_TYPE.CARD_DETAIL}
          offers={nearbyOffers.slice(0, NEAR_PLACES_COUNT)}
          coordinates={coordinates} />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <CardList offers={nearbyOffers.slice(0, NEAR_PLACES_COUNT)} type={CARD_TYPE.CARD_DETAIL} onCardTitleClick={onCardTitleClick} />
        </section>
      </div>
    </main>
  </div>;
};

CardDetail.propTypes = {
  offerId: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    inBookmarks: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number),
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
  })).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCardDetailLoad: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onCardDetailLoad(offerId) {
    dispatch(Operation.loadNearbyOffers(offerId));
  }
});

const mapStateToProps = (state) => ({
  offers: state.offers,
  nearbyOffers: state.nearbyOffers
});

export default connect(mapStateToProps, mapDispatchToProps)(CardDetail);
