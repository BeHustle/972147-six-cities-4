import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Sorts} from '../../constants.js';
import {Mock} from '../../mocks/test-mock.js';
import CitiesList from './cities-list.jsx';

const mockStore = configureStore([]);

it(`Render Map`, () => {
  const store = mockStore({
    offers: Mock.offers,
    city: Mock.cities[0],
    cities: Mock.cities,
    userEmail: Mock.userEmail,
    sorts: Sorts,
    activeSort: Sorts.POPULAR,
    activeOfferId: null
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <CitiesList />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
