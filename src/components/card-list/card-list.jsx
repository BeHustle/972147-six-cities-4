import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {CARD_TYPE, HouseType, Sorts} from '../../constants.js';
import {getActiveSort} from '../../reducer/app/app.selectors.js';
import Card from '../card/card.jsx';

const getCardListTypeClass = (type) => {
  switch (type) {
    case CARD_TYPE.MAIN:
      return `cities__places-list tabs__content`;
    case CARD_TYPE.CARD_DETAIL:
      return `near-places__list`;
    default:
      return ``;
  }
};

const sortCards = (cards, sortType) => {
  switch (sortType) {
    case Sorts.PRICE_ASC:
      return cards.sort((a, b) => a.price - b.price);
    case Sorts.PRICE_DESC:
      return cards.sort((a, b) => b.price - a.price);
    case Sorts.TOP_RATED:
      return cards.sort((a, b) => b.rating - a.rating);
    default:
      return cards;
  }
};

const CardList = ({offers, onCardTitleClick, type, sortType}) =>
  <div className={`places__list ${getCardListTypeClass(type)}`}>
    {sortCards(offers, sortType).map((offer) =>
      <Card
        cardType={type}
        key={offer.id}
        offer={offer}
        onTitleClick={onCardTitleClick}
      />)}
  </div>;

CardList.propTypes = {
  onCardTitleClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  sortType: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.oneOf(HouseType).isRequired,
    isPremium: PropTypes.bool.isRequired,
    inBookmarks: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
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
  })).isRequired,
};

const mapStateToProps = (state) => ({
  sortType: getActiveSort(state)
});

export default connect(mapStateToProps)(CardList);
