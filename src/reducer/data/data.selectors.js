import {getActiveCity} from '../app/app.selectors.js';
import {Namespace} from '../namespace.js';
import {createSelector} from 'reselect';

export const getOffers = (state) => state[Namespace.DATA].offers;

export const getReviews = (state) => state[Namespace.DATA].reviews;

export const getNearbyOffers = (state) => state[Namespace.DATA].nearbyOffers;

export const getCities = (state) => state[Namespace.DATA].cities;

export const getOffersByCity = createSelector(
    getOffers,
    getActiveCity,
    (offers, activeCity) => offers.filter((offer) => offer.cityId === activeCity.id),
);
