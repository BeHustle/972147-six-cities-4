import {citiesFromOffersAdapter} from '../../adapters/cities-from-offers-adapter.js';
import {commentAdapter} from '../../adapters/comment-adapter.js';
import {offerAdapter} from '../../adapters/offer-adapter.js';
import {setActiveCity, setAppStatus} from '../app/app.reducer.js';
import {AppStatus} from '../../constants.js';
import {getCities} from './data.selectors.js';

const initialState = {
  reviews: [],
  nearbyOffers: [],
};

const ActionTypes = {
  SET_OFFERS: `SET_OFFERS`,
  SET_REVIEWS: `SET_REVIEWS`,
  SET_NEARBY_OFFERS: `SET_NEARBY_OFFERS`,
  SET_CITIES: `SET_CITIES`,
};


export const setOffers = (offers) => ({
  type: ActionTypes.SET_OFFERS,
  payload: offers,
});

export const setReviews = (reviews) => ({
  type: ActionTypes.SET_REVIEWS,
  payload: reviews,
});

export const setNearbyOffers = (reviews) => ({
  type: ActionTypes.SET_NEARBY_OFFERS,
  payload: reviews,
});

export const setCities = (cities) => ({
  type: ActionTypes.SET_CITIES,
  payload: cities,
});


export const Operation = {
  loadData: () => async (dispatch, getState, api) => {
    try {
      const response = await api.get(`/hotels`);
      const cities = citiesFromOffersAdapter(response.data);
      dispatch(setOffers(response.data.map((it) => offerAdapter(it, cities))));
      dispatch(setCities(cities));
      dispatch(setActiveCity(cities[0]));
      dispatch(setAppStatus(AppStatus.SUCCESS_LOAD));
    } catch (e) {
      dispatch(setAppStatus(AppStatus.FAIL_LOAD));
      throw e;
    }
  },
  loadReviews: (offerId) => async (dispatch, getState, api) => {
    try {
      const response = await api.get(`/comments/${offerId}`);
      dispatch(setReviews(response.data.map((it) => commentAdapter(it))));
    } catch (e) {
      dispatch(setReviews([]));
      throw e;
    }
  },
  loadNearbyOffers: (offerId) => async (dispatch, getState, api) => {
    try {
      const response = await api.get(`/hotels/${offerId}/nearby`);
      dispatch(setNearbyOffers(response.data.map((it) => offerAdapter(it, getCities(getState())))));
    } catch (e) {
      dispatch(setNearbyOffers([]));
      throw e;
    }
  },
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.SET_OFFERS:
      return Object.assign({}, state, {offers: action.payload});
    case ActionTypes.SET_CITIES:
      return Object.assign({}, state, {cities: action.payload});
    case ActionTypes.SET_REVIEWS:
      return Object.assign({}, state, {reviews: action.payload});
    case ActionTypes.SET_NEARBY_OFFERS:
      return Object.assign({}, state, {nearbyOffers: action.payload});
    default:
      return state;
  }
};

