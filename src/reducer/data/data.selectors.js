import {MAX_REVIEWS_COUNT} from '../../constants.js';
import {getActiveCity} from '../app/app.selectors.js';
import {Namespace} from '../namespace.js';
import {createSelector} from 'reselect';

export const getOffers = (state) => state[Namespace.DATA].offers;

export const getReviews = (state) => {
  const reviews = state[Namespace.DATA].reviews;
  if (reviews.length < 2) {
    return reviews;
  }
  return reviews.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, MAX_REVIEWS_COUNT);
};

export const getNearbyOffers = (state) => state[Namespace.DATA].nearbyOffers;

export const getCities = (state) => state[Namespace.DATA].cities;

export const getOffersByCity = createSelector(
    getOffers,
    getActiveCity,
    (offers, activeCity) => offers.filter((offer) => offer.cityId === activeCity.id),
);

export const getCommentStatus = (state) => state[Namespace.DATA].commentStatus;

export const getFavoriteCities = (state) => state[Namespace.DATA].favoriteCities;

export const getFavoriteOffers = (state) => state[Namespace.DATA].favoriteOffers;
