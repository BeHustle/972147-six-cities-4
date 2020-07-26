import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Sorts} from '../../constants.js';
import Reviews from './reviews.jsx';
import {cities} from '../../mocks/cities.js';
import {offers} from '../../mocks/offers.js';
import {email} from '../../mocks/user.js';
import {reviews} from '../../mocks/reviews.js';

const mockStore = configureStore([]);

it(`Render Sort list`, () => {
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
          <Reviews offerId={1} />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
