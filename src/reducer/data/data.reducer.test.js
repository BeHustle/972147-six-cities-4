import {citiesFromOffersAdapter} from '../../adapters/cities-from-offers-adapter';
import {commentAdapter} from '../../adapters/comment-adapter';
import {offerAdapter} from '../../adapters/offer-adapter';
import {AppStatus, CommentStatus} from '../../constants';
import {setActiveCity, setAppStatus} from '../app/app.reducer';
import {Namespace} from '../namespace';
import {
  reducer,
  Operation,
  setCities,
  setOffers,
  setNearbyOffers,
  setReviews,
  setCommentStatus,
  setFavoriteOffers, setFavoriteCities, updateOffer, removeOffer,
} from './data.reducer';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api/api';
import {cities} from '../../test-mocks/cities';
import {offers, serverOffers} from '../../test-mocks/offers';
import {reviews, serverReviews} from '../../test-mocks/reviews';

describe(`Data reducer`, () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      reviews: [],
      nearbyOffers: [],
      favoriteOffers: [],
      favoriteCities: [],
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

  it(`should change commentStatus to a given value`, () => {
    expect(reducer(initialState, setCommentStatus(CommentStatus.SUCCESS)))
      .toEqual(Object.assign({}, initialState, {commentStatus: CommentStatus.SUCCESS}));
  });

  it(`should change favorite offers to a given value`, () => {
    expect(reducer(initialState, setFavoriteOffers(offers)))
      .toEqual(Object.assign({}, initialState, {favoriteOffers: offers}));
  });

  it(`should change favorite cities to a given value`, () => {
    expect(reducer(initialState, setFavoriteCities(cities)))
      .toEqual(Object.assign({}, initialState, {favoriteCities: cities}));
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
    const adaptedReviews = serverReviews.map((it) => commentAdapter(it));
    const offersLoader = Operation.addComment({
      comment: {
        rating: 5,
        comment: `Good hotel`
      },
    }, 5);

    apiMock
      .onPost(`/comments/5`)
      .reply(200, serverReviews);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toBeCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, setCommentStatus(CommentStatus.SUCCESS));
        expect(dispatch).toHaveBeenNthCalledWith(2, setReviews(adaptedReviews));
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

  it(`Should make a correct API call to /favorite`, () => {
    const favoriteOffersLoader = Operation.loadFavoriteData();
    const adaptedOffers = serverOffers.map((it) => offerAdapter(it, cities));
    const state = {
      [Namespace.DATA]: {
        cities
      }
    };

    apiMock
      .onGet(`/favorite`)
      .reply(200, serverOffers);

    return favoriteOffersLoader(dispatch, () => state, api)
      .then(() => {
        expect(dispatch).toBeCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, setFavoriteOffers(adaptedOffers));
        expect(dispatch).toHaveBeenNthCalledWith(2, setFavoriteCities(citiesFromOffersAdapter(serverOffers)));
      });
  });

  it(`Should make a correct API call to /favorite/:hotelId/:status`, () => {
    const favoriteLoader = Operation.addFavoriteOffer({
      hotelId: 5,
      status: 1
    });
    const adaptedCities = citiesFromOffersAdapter(serverOffers);
    const adaptedOffers = serverOffers.map((it) => offerAdapter(it, adaptedCities));
    const state = {
      [Namespace.DATA]: {
        offers: adaptedOffers,
        nearbyOffers: adaptedOffers,
        favoriteOffers: adaptedOffers,
        cities
      }
    };

    apiMock
      .onPost(`/favorite/5/1`)
      .reply(200, serverOffers[0]);

    return favoriteLoader(dispatch, () => state, api)
      .then(() => {
        expect(dispatch).toBeCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, setOffers(updateOffer(adaptedOffers[0], adaptedOffers)));
        expect(dispatch).toHaveBeenNthCalledWith(2, setNearbyOffers(updateOffer(adaptedOffers[0], adaptedOffers)));
        expect(dispatch).toHaveBeenNthCalledWith(3, setFavoriteOffers(removeOffer(adaptedOffers[0], adaptedOffers)));
      });
  });
});
