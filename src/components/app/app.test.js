import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Sorts} from '../../constants.js';
import App from './app.jsx';
import {cities} from '../../test-mocks/cities.js';
import {offers} from '../../test-mocks/offers.js';
import {email} from '../../test-mocks/user.js';

jest.mock(`../map/map.jsx`, () => `map`);

const mockStore = configureStore([]);

it(`App snapshot`, () => {
  const store = mockStore({
    offers,
    city: cities[0],
    cities,
    userEmail: email,
    sorts: Sorts,
    activeSort: Sorts.POPULAR,
    activeOfferId: null
  });

  const tree = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
