import {AppStatus, Sorts} from '../../constants.js';

const initialState = {
  activeSort: Sorts.POPULAR,
  activeOfferId: null,
  activeCity: null,
  appStatus: AppStatus.LOADING,
};

const ActionTypes = {
  SET_ACTIVE_SORT: `SET_ACTIVE_SORT`,
  SET_ACTIVE_OFFER_ID: `SET_ACTIVE_OFFER_ID`,
  SET_ACTIVE_CITY: `SET_ACTIVE_CITY`,
  SET_APP_STATUS: `SET_APP_STATUS`,
};


export const setActiveCity = (city) => ({
  type: ActionTypes.SET_ACTIVE_CITY,
  payload: city,
});

export const setActiveSort = (sort) => ({
  type: ActionTypes.SET_ACTIVE_SORT,
  payload: sort,
});

export const setActiveOfferId = (offerId) => ({
  type: ActionTypes.SET_ACTIVE_OFFER_ID,
  payload: offerId,
});

export const setAppStatus = (status) => ({
  type: ActionTypes.SET_APP_STATUS,
  payload: status,
});

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.SET_APP_STATUS:
      return Object.assign({}, state, {appStatus: action.payload});
    case ActionTypes.SET_ACTIVE_CITY:
      return Object.assign({}, state, {activeCity: action.payload});
    case ActionTypes.SET_ACTIVE_SORT:
      return Object.assign({}, state, {activeSort: action.payload});
    case ActionTypes.SET_ACTIVE_OFFER_ID:
      return Object.assign({}, state, {activeOfferId: action.payload});
    default:
      return state;
  }
};
