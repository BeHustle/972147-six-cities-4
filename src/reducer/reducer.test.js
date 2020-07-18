import {reducer, ActionTypes} from './reducer.js';
import {offers} from '../mocks/offers.js';
import {cities} from '../mocks/cities.js';
import {email} from '../mocks/user.js';
import {Sorts} from '../constants.js';

describe(`Reducer`, () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      city: cities[0],
      offers,
      cities,
      userEmail: email,
      sorts: Sorts,
      activeSort: Sorts.POPULAR,
      activeOfferId: null
    };
  });

  it(`without additional parameters should return initial state`, () => {
    expect(reducer()).toEqual(initialState);
  });

  it(`should change city name to a given value`, () => {
    expect(reducer(initialState, {
      type: ActionTypes.CHANGE_CITY,
      payload: `Paris`,
    })).toEqual(Object.assign({}, initialState, {city: `Paris`}));
  });

  it(`should change sort to a given value`, () => {
    expect(reducer(initialState, {
      type: ActionTypes.CHANGE_SORT,
      payload: Sorts.PRICE_ASC
    })).toEqual(Object.assign({}, initialState, {activeSort: Sorts.PRICE_ASC}));
  });

  it(`should change active offer id to a given value`, () => {
    expect(reducer(initialState, {
      type: ActionTypes.CHANGE_ACTIVE_OFFER_ID,
      payload: 234
    })).toEqual(Object.assign({}, initialState, {activeOfferId: 234}));
  });
});


