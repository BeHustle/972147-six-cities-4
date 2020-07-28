import {offers} from '../mocks/offers.js';
import {cities} from '../mocks/cities.js';
import {email} from '../mocks/user.js';
import {reviews} from '../mocks/reviews.js';
import {Sorts} from '../constants.js';

const initialState = {
  city: cities[0],
  offers,
  cities,
  reviews,
  userEmail: email,
  sorts: Sorts,
  activeSort: Sorts.POPULAR,
  activeOfferId: null
};

const ActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT: `CHANGE_SORT`,
  CHANGE_ACTIVE_OFFER_ID: `CHANGE_ACTIVE_OFFER_ID`
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.CHANGE_CITY:
      return Object.assign({}, state, {city: action.payload});
    case ActionTypes.CHANGE_SORT:
      return Object.assign({}, state, {activeSort: action.payload});
    case ActionTypes.CHANGE_ACTIVE_OFFER_ID:
      return Object.assign({}, state, {activeOfferId: action.payload});
    default:
      return state;
  }
};

export {ActionTypes, reducer};
