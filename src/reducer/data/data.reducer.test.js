import {citiesFromOffersAdapter} from '../../adapters/cities-from-offers-adapter.js';
import {commentAdapter} from '../../adapters/comment-adapter.js';
import {offerAdapter} from '../../adapters/offer-adapter.js';
import {AppStatus, CommentStatus} from '../../constants.js';
import {setActiveCity, setAppStatus} from '../app/app.reducer.js';
import {Namespace} from '../namespace.js';
import {
  reducer,
  Operation,
  setCities,
  setOffers,
  setNearbyOffers,
  setReviews,
  setCommentStatus,
} from './data.reducer.js';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api/api.js';
import {cities} from '../../test-mocks/cities.js';
import {offers, serverOffers} from '../../test-mocks/offers.js';
import {reviews, serverReviews} from '../../test-mocks/reviews.js';

describe(`Data reducer`, () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      reviews: [],
      nearbyOffers: [],
      commentStatus: CommentStatus.NOT_SEND
    };
  });

  it(`without additional parameters should return initial state`, () => {
    expect(reducer()).toEqual(initialState);
  });

  it(`should change cities to a given value`, () => {
    expect(reducer(initialState, setCities(cities)))
      .toEqual(Object.assign({}, initialState, {cities}));
  });

  it(`should change offers to a given value`, () => {
    expect(reducer(initialState, setOffers(offers)))
      .toEqual(Object.assign({}, initialState, {offers}));
  });

  it(`should change nearby offers to a given value`, () => {
    expect(reducer(initialState, setNearbyOffers(offers)))
      .toEqual(Object.assign({}, initialState, {nearbyOffers: offers}));
  });

  it(`should change reviews to a given value`, () => {
    expect(reducer(initialState, setReviews(reviews)))
      .toEqual(Object.assign({}, initialState, {reviews}));
  });
});

describe(`Data reducer API methods`, () => {
  let api;
  let apiMock;
  let dispatch;

  beforeEach(() => {
    api = createAPI();
    apiMock = new MockAdapter(api);
    dispatch = jest.fn();
  });

  it(`Should make a correct API call to /hotels`, () => {
    const offersLoader = Operation.loadData();
    const adaptedCities = citiesFromOffersAdapter(serverOffers);
    const adaptedOffers = serverOffers.map((it) => offerAdapter(it, adaptedCities));

    apiMock
      .onGet(`/hotels`)
      .reply(200, serverOffers);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toBeCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(1, setOffers(adaptedOffers));
        expect(dispatch).toHaveBeenNthCalledWith(2, setCities(adaptedCities));
        expect(dispatch).toHaveBeenNthCalledWith(3, setActiveCity(adaptedCities[0]));
        expect(dispatch).toHaveBeenNthCalledWith(4, setAppStatus(AppStatus.SUCCESS_LOAD));
      });
  });

  it(`Should make a correct API call to /comments/`, () => {
    const offersLoader = Operation.loadReviews(10);
    const adaptedReviews = serverReviews.map((it) => commentAdapter(it));

    apiMock
      .onGet(`/comments/10`)
      .reply(200, serverReviews);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(setReviews(adaptedReviews));
      });
  });

  it(`Should make a correct API call to /hotels/:offerId/nearby`, () => {
    const offersLoader = Operation.loadNearbyOffers(10);
    const adaptedOffers = serverOffers.map((it) => offerAdapter(it, cities));
    const state = {
      [Namespace.DATA]: {
        cities
      }
    };

    apiMock
      .onGet(`/hotels/10/nearby`)
      .reply(200, serverOffers);

    return offersLoader(dispatch, () => state, api)
      .then(() => {
        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(setNearbyOffers(adaptedOffers));
      });
  });

  it(`Should make a correct API call to /comments/:hotelId ONSUCCESS`, () => {
    const offersLoader = Operation.addComment({
      comment: {
        rating: 5,
        comment: `Good hotel`
      },
    }, 5);

    apiMock
      .onPost(`/comments/5`)
      .reply(200);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(setCommentStatus(CommentStatus.SUCCESS));
      });
  });

  it(`Should make a correct API call to /comments/:hotelId ONFAIL`, () => {
    const offersLoader = Operation.addComment({
      comment: {
        rating: 5,
        comment: `Good hotel`
      },
    }, 5);

    apiMock
      .onPost(`/comments/5`)
      .reply(400);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {})
      .catch(() => {
        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(setCommentStatus(CommentStatus.FAIL));
      });
  });
});
