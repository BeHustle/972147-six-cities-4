import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Sorts} from '../../constants.js';
import Main from './main.jsx';
import {cities} from '../../mocks/cities.js';
import {offers} from '../../mocks/offers.js';
import {email} from '../../mocks/user.js';

jest.mock(`../map/map.jsx`, () => `map`);

const mockStore = configureStore([]);

it(`Render Main`, () => {
  const store = mockStore({
    offers,
    city: cities[0],
    cities,
    userEmail: email,
    sorts: Sorts,
    activeSort: Sorts.POPULAR,
    activeOfferId: null
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Main onCardTitleClick={() => {}}/>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
