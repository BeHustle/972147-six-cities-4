import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {CARD_TYPES} from '../../constants.js';
import Card from '../card/card.jsx';

class CardList extends React.PureComponent {
  constructor(props) {
    super(props);
    this._handleCardHover = this._handleCardHover.bind(this);
    this.state = {
      active: null
    };
  }

  _handleCardHover(id) {
    this.setState({
      active: id
    });
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
};

const mapStateToProps = (state) => {
  return {
    offers: state.offers.filter((offer) => offer.cityId === state.city.id),
  };
};

export default connect(mapStateToProps, null)(CardList);
