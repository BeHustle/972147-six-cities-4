import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {CARD_TYPE, Sorts} from '../../constants.js';
import Map from './map.jsx';
import {cities} from '../../mocks/cities.js';
import {offers} from '../../mocks/offers.js';
import {email} from '../../mocks/user.js';

jest.mock(`../map/map.jsx`, () => `map`);

const mockStore = configureStore([]);

it(`Render Map`, () => {
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
          <Map
            type={CARD_TYPE.MAIN}
            offers={offers}
            coordinates={cities[0].coordinates}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
