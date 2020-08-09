import {citiesFromOffersAdapter} from '../../adapters/cities-from-offers-adapter';
import {commentAdapter} from '../../adapters/comment-adapter';
import {offerAdapter} from '../../adapters/offer-adapter';
import {setActiveCity, setAppStatus} from '../app/app.reducer';
import {AppStatus, CommentStatus} from '../../constants';
import {getCities, getFavoriteOffers, getNearbyOffers, getOffers} from './data.selectors';

export const updateOffer = (offer, offers) => {
  const index = offers.findIndex((it) => it.id === offer.id);
  if (index === -1) {
    return offers;
  }
  const newOffers = offers.slice();
  newOffers[index] = offer;
  return newOffers;
};

export const removeOffer = (offer, offers) => {
  const index = offers.findIndex((it) => it.id === offer.id);
  if (index === -1) {
    return offers;
  }
  const newOffers = offers.slice();
  newOffers.splice(index, 1);
  return newOffers;
};

const initialState = {
  reviews: [],
  nearbyOffers: [],
  favoriteOffers: [],
  favoriteCities: [],
  commentStatus: CommentStatus.NOT_SEND
};

const ActionTypes = {
  SET_OFFERS: `SET_OFFERS`,
  SET_REVIEWS: `SET_REVIEWS`,
  SET_NEARBY_OFFERS: `SET_NEARBY_OFFERS`,
  SET_CITIES: `SET_CITIES`,
  SET_FAVORITE_OFFERS: `SET_FAVORITE_OFFERS`,
  SET_FAVORITE_CITIES: `SET_FAVORITE_CITIES`,
  SET_COMMENT_STATUS: `SET_COMMENT_STATUS`
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

export const setCommentStatus = (status) => ({
  type: ActionTypes.SET_COMMENT_STATUS,
  payload: status,
});

export const setFavoriteOffers = (offers) => ({
  type: ActionTypes.SET_FAVORITE_OFFERS,
  payload: offers,
});

export const setFavoriteCities = (cities) => ({
  type: ActionTypes.SET_FAVORITE_CITIES,
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
  addComment: ({comment, rating} = comment, offerId) => async (dispatch, getState, api) => {
    try {
      await api.post(`/comments/${offerId}`, {rating, comment});
      dispatch(setCommentStatus(CommentStatus.SUCCESS));
    } catch (e) {
      dispatch(setCommentStatus(CommentStatus.FAIL));
      throw e;
    }
  },
  loadFavoriteData: () => async (dispatch, getState, api) => {
    try {
      const response = await api.get(`/favorite`);
      if (response.data.length) {
        const cities = citiesFromOffersAdapter(response.data);
        dispatch(setFavoriteOffers(response.data.map((it) => offerAdapter(it, cities))));
        dispatch(setFavoriteCities(cities));
      }
    } catch (e) {
      throw e;
    }
  },
  addFavoriteOffer: ({hotelId, status}) => async (dispatch, getState, api) => {
    try {
      const response = await api.post(`/favorite/${hotelId}/${status}`);
      const offer = offerAdapter(response.data, getCities(getState()));
      dispatch(setOffers(updateOffer(offer, getOffers(getState()))));
      dispatch(setNearbyOffers(updateOffer(offer, getNearbyOffers(getState()))));
      dispatch(setFavoriteOffers(removeOffer(offer, getFavoriteOffers(getState()))));
    } catch (e) {
      throw e;
    }
  }
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
    case ActionTypes.SET_COMMENT_STATUS:
      return Object.assign({}, state, {commentStatus: action.payload});
    case ActionTypes.SET_FAVORITE_OFFERS:
      return Object.assign({}, state, {favoriteOffers: action.payload});
    case ActionTypes.SET_FAVORITE_CITIES:
      return Object.assign({}, state, {favoriteCities: action.payload});
    default:
      return state;
  }
};
