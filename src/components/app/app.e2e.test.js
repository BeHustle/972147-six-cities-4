import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createAPI} from '../../api/api.js';
import {AppStatus, AuthStatus} from '../../constants.js';
import {setActiveCity, setAppStatus} from '../../reducer/app/app.reducer.js';
import {setCities, setNearbyOffers, setOffers, setReviews} from '../../reducer/data/data.reducer.js';
import reducer from '../../reducer/reducer.js';
import {setUserInfo, setAuthStatus} from '../../reducer/user/user.reducer.js';
import {cities} from '../../test-mocks/cities.js';
import {serverOffers} from '../../test-mocks/offers.js';
import {reviews, serverReviews} from '../../test-mocks/reviews.js';
import {serverUserInfo, userInfo} from '../../test-mocks/user.js';
import App from './app.jsx';
import {offers} from '../../test-mocks/offers.js';


Enzyme.configure({
  adapter: new Adapter(),
});

jest.mock(`../map/map.jsx`, () => `map`);

const api = createAPI();
const apiMock = new MockAdapter(api);

apiMock
  .onGet(`/hotels`)
  .reply(200, serverOffers);

apiMock
  .onGet(`/comments/1`)
  .reply(200, serverReviews);

apiMock
  .onGet(`/hotels/1/nearby`)
  .reply(200, serverOffers);

apiMock
  .onGet(`/login`)
  .reply(200, serverUserInfo);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(setOffers(offers));
store.dispatch(setReviews(reviews));
store.dispatch(setNearbyOffers(offers));
store.dispatch(setCities(cities));
store.dispatch(setActiveCity(cities[0]));
store.dispatch(setAppStatus(AppStatus.SUCCESS_LOAD));
store.dispatch(setUserInfo(userInfo));
store.dispatch(setAuthStatus(AuthStatus.AUTH));

describe(`Title card click:`, () => {
  let appWithProvider;
  let app;

  beforeEach(() => {
    appWithProvider = mount(<Provider store={store}>
      <App />
    </Provider>);
    app = appWithProvider.find(`App`);
  });

  it(`should change app state screen to offer`, () => {
    const card = appWithProvider.find(`Card`).first();
    const titleCardLink = card.find(`.place-card__name a`);

    titleCardLink.simulate(`click`);
    expect(app.state().screen).toBe(`offer`);
  });

  it(`should change app state offerId to Card id`, () => {
    const card = appWithProvider.find(`Card`).last();
    const cardId = card.props().offer.id;
    const titleCardLink = card.find(`.place-card__name a`);

    titleCardLink.simulate(`click`);

    expect(app.state().offerId).toBe(cardId);
  });

  it(`should render CardDetail`, () => {
    const card = appWithProvider.find(`Card`).first();
    const titleCardLink = card.find(`.place-card__name a`);

    titleCardLink.simulate(`click`);

    const cardDetail = appWithProvider.find(`CardDetail`);
    expect(cardDetail.length).not.toBe(0);
  });

  it(`should render CardDetail with some id as Card id`, () => {
    const card = appWithProvider.find(`Card`).last();
    const cardId = card.props().offer.id;
    const titleCardLink = card.find(`.place-card__name a`);

    titleCardLink.simulate(`click`);

    const cardDetail = appWithProvider.find(`CardDetail`);
    expect(cardDetail.props().offerId).toBe(cardId);
  });

  it(`should change app state screen to login`, () => {
    const signInLink = appWithProvider.find(`.header__nav-link--profile`).first();

    signInLink.simulate(`click`);
    expect(app.state().screen).toBe(`login`);
  });

  it(`should render login screen on click to sign in`, () => {
    const signInLink = appWithProvider.find(`.header__nav-link--profile`).first();

    signInLink.simulate(`click`);
    const loginScreen = appWithProvider.find(`.page__main--login`);
    expect(loginScreen.length).not.toBe(0);
  });
});
