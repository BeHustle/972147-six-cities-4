import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {CARD_TYPE, Sorts} from '../../constants.js';
import CardList from './card-list.jsx';
import {cities} from '../../test-mocks/cities.js';
import {offers} from '../../test-mocks/offers.js';
import {email} from '../../test-mocks/user.js';

const mockStore = configureStore([]);

it(`Render Cards list`, () => {
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
          <CardList
            offers={offers}
            type={CARD_TYPE.MAIN}
            onCardTitleClick={() => {}}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
