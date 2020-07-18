import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {CARD_TYPES, Sorts} from '../../constants.js';
import {ActionTypes} from '../../reducer/reducer.js';
import Card from '../card/card.jsx';

class CardList extends React.PureComponent {
  constructor(props) {
    super(props);
    this._handleCardHover = this._handleCardHover.bind(this);
  }

  _handleCardHover(id) {
    this.props.onCardHover(id);
  }

  render() {
    const {offers, onCardTitleClick} = this.props;
    return <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <Card
          key={offer.id}
          offer={offer}
          onTitleClick={onCardTitleClick}
          onCardHover={this._handleCardHover}
        />)}
    </div>;
  }
}

CardList.propTypes = {
  onCardTitleClick: PropTypes.func.isRequired,
  offers: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.oneOf(CARD_TYPES).isRequired,
    isPremium: PropTypes.bool.isRequired,
    inBookmarks: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
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
  onCardHover: PropTypes.func.isRequired
};

const sortCards = (cards, sortType) => {
  switch (sortType) {
    case Sorts.POPULAR: // TODO fix popular sort. How to sort?
      return cards.sort((a, b) => a.rating - b.rating);
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

const mapStateToProps = (state) => ({
  offers: sortCards(state.offers.filter((offer) => offer.cityId === state.city.id), state.activeSort)
});

const mapDispatchToProps = (dispatch) => ({
  onCardHover(id) {
    dispatch({type: ActionTypes.CHANGE_ACTIVE_OFFER_ID, payload: id});
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
