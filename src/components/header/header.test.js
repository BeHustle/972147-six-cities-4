import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Header from './header.jsx';
import {cities} from '../../mocks/cities.js';
import {offers} from '../../mocks/offers.js';
import {email} from '../../mocks/user.js';

const mockStore = configureStore([]);

it(`Render Header`, () => {
  const store = mockStore({
    offers,
    city: cities[0],
    cities,
    userEmail: email
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Header />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
