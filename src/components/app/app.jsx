import React from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';
import {CARD_TYPES, CARD_NAMES} from '../../constants';

const App = (props) => {
  const {countOffers, userEmail, cardPrice, cardName, cardType} = props;
  return <Main
    countOffers = {countOffers}
    userEmail = {userEmail}
    cardPrice = {cardPrice}
    cardName = {cardName}
    cardType = {cardType}
  />;
};

App.propTypes = {
  countOffers: PropTypes.number.isRequired,
  userEmail: PropTypes.string.isRequired,
  cardPrice: PropTypes.number.isRequired,
  cardName: PropTypes.oneOf(CARD_NAMES),
  cardType: PropTypes.oneOf(CARD_TYPES)
};

export default App;
