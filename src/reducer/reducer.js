import {offers} from '../mocks/offers.js';
import {cities} from '../mocks/cities.js';
import {email} from '../mocks/user.js';


const initialState = {
  city: cities[0],
  offers,
  cities,
  userEmail: email
};

const ActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_OFFERS: `CHANGE_OFFERS`
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_CITY:
      return Object.assign({}, state, {city: action.payload});
    case ActionTypes.CHANGE_OFFERS:
      return Object.assign({}, state, {offers: action.payload});
    default:
      return state;
  }
};

export {ActionTypes, reducer};
