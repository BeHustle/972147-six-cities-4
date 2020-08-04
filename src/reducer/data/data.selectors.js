import {Namespace} from '../namespace.js';

export const getOffers = (state) => state[Namespace.DATA].offers;

export const getReviews = (state) => state[Namespace.DATA].reviews;

export const getNearbyOffers = (state) => state[Namespace.DATA].nearbyOffers;

export const getCities = (state) => state[Namespace.DATA].cities;
