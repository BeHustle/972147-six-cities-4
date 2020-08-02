import {citiesFromOffersAdapter} from '../adapters/cities-from-offers-adapter.js';
import {commentAdapter} from '../adapters/comment-adapter.js';
import {offerAdapter} from '../adapters/offer-adapter.js';
import {Sorts, AppStatus} from '../constants.js';

const initialState = {
  sorts: Sorts,
  activeSort: Sorts.POPULAR,
  activeOfferId: null,
  appStatus: AppStatus.LOADING,
  reviews: [],
  nearbyOffers: []
};

const ActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT: `CHANGE_SORT`,
  CHANGE_ACTIVE_OFFER_ID: `CHANGE_ACTIVE_OFFER_ID`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  SET_CITIES: `SET_CITIES`,
  LOAD_USER_EMAIL: `LOAD_USER_EMAIL`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_NEARBY_OFFERS: `LOAD_NEARBY_OFFERS`,
  CHANGE_APP_STATUS: `CHANGE_APP_STATUS`
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionTypes.CHANGE_CITY,
    payload: city,
  }),
  changeSort: (sort) => ({
    type: ActionTypes.CHANGE_SORT,
    payload: sort,
  }),
  changeActiveOfferId: (offerId) => ({
    type: ActionTypes.CHANGE_ACTIVE_OFFER_ID,
    payload: offerId,
  }),
  loadOffers: (offers) => ({
    type: ActionTypes.LOAD_OFFERS,
    payload: offers,
  }),
  setCities: (cities) => ({
    type: ActionTypes.SET_CITIES,
    payload: cities,
  }),
  loadReviews: (reviews) => ({
    type: ActionTypes.LOAD_REVIEWS,
    payload: reviews,
  }),
  loadNearbyOffers: (reviews) => ({
    type: ActionTypes.LOAD_NEARBY_OFFERS,
    payload: reviews,
  }),
  loadUserEmail: (userEmail) => ({
    type: ActionTypes.LOAD_USER_EMAIL,
    payload: userEmail,
  }),
  changeAppStatus: (status) => ({
    type: ActionTypes.CHANGE_APP_STATUS,
    payload: status,
  }),
};

const Operation = {
  loadData: () => async (dispatch, getState, api) => {
    try {
      const response = await api.get(`/hotels`);
      const cities = citiesFromOffersAdapter(response.data);
      dispatch(ActionCreator.loadOffers(response.data.map((it) => offerAdapter(it, cities))));
      dispatch(ActionCreator.setCities(cities));
      dispatch(ActionCreator.changeCity(cities[0]));
      dispatch(ActionCreator.changeAppStatus(AppStatus.SUCCESS_LOAD));
    } catch (e) {
      dispatch(ActionCreator.changeAppStatus(AppStatus.FAIL_LOAD));
    }
  },
  loadReviews: (offerId) => async (dispatch, getState, api) => {
    try {
      const response = await api.get(`/comments/${offerId}`);
      dispatch(ActionCreator.loadReviews(response.data.map((it) => commentAdapter(it))));
    } catch (e) {
      dispatch(ActionCreator.loadReviews([]));
    }
  },
  loadNearbyOffers: (offerId) => async (dispatch, getState, api) => {
    try {
      const response = await api.get(`/hotels/${offerId}/nearby`);
      dispatch(ActionCreator.loadNearbyOffers(response.data.map((it) => offerAdapter(it, getState.cities))));
    } catch (e) {
      dispatch(ActionCreator.loadNearbyOffers([]));
    }
  }
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.CHANGE_CITY:
      return Object.assign({}, state, {city: action.payload});
    case ActionTypes.CHANGE_SORT:
      return Object.assign({}, state, {activeSort: action.payload});
    case ActionTypes.CHANGE_ACTIVE_OFFER_ID:
      return Object.assign({}, state, {activeOfferId: action.payload});
    case ActionTypes.LOAD_OFFERS:
      return Object.assign({}, state, {offers: action.payload});
    case ActionTypes.SET_CITIES:
      return Object.assign({}, state, {cities: action.payload});
    case ActionTypes.LOAD_USER_EMAIL:
      return Object.assign({}, state, {userEmail: action.payload});
    case ActionTypes.LOAD_REVIEWS:
      return Object.assign({}, state, {reviews: action.payload});
    case ActionTypes.LOAD_NEARBY_OFFERS:
      return Object.assign({}, state, {nearbyOffers: action.payload});
    case ActionTypes.CHANGE_APP_STATUS:
      return Object.assign({}, state, {appStatus: action.payload});
    default:
      return state;
  }
};

export {ActionTypes, ActionCreator, Operation, reducer};
