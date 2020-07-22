import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Mock} from '../../mocks/test-mock.js';
import CardDetail from './card-detail.jsx';

const mockStore = configureStore([]);

it(`Render Card Detail`, () => {
  const store = mockStore({
    offers: Mock.offers,
    city: Mock.cities[0],
    cities: Mock.cities,
    userEmail: Mock.userEmail
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <CardDetail
            offer={Mock.offers[0]}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
