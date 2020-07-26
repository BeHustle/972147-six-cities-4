import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Sorts} from '../../constants.js';
import {reviews} from '../../mocks/reviews.js';
import App from './app.jsx';
import {cities} from '../../mocks/cities.js';
import {offers} from '../../mocks/offers.js';
import {email} from '../../mocks/user.js';

Enzyme.configure({
  adapter: new Adapter(),
});

jest.mock(`../map/map.jsx`, () => `map`);

describe(`Title card click:`, () => {
  let appWithProvider;
  let app;
  let mockStore;
  let store;

  beforeEach(() => {
    mockStore = configureStore([]);
    store = mockStore({
      offers,
      city: cities[0],
      cities,
      userEmail: email,
      sorts: Sorts,
      activeSort: Sorts.POPULAR,
      activeOfferId: null,
      reviews
    });
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
});
