import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Sorts} from '../../constants.js';
import CardDetail from './card-detail.jsx';
import {cities} from '../../mocks/cities.js';
import {offers} from '../../mocks/offers.js';
import {email} from '../../mocks/user.js';
import {reviews} from '../../mocks/reviews.js';

const mockStore = configureStore([]);
jest.mock(`../map/map.jsx`, () => `map`);

it(`Card detail render`, () => {
  const store = mockStore({
    offers,
    city: cities[0],
    cities,
    userEmail: email,
    sorts: Sorts,
    activeSort: Sorts.POPULAR,
    activeOfferId: null,
    reviews
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <CardDetail
            offerId={1}
            onCardTitleClick={() => {}}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
