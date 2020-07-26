import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {CARD_TYPE, Sorts} from '../../constants.js';
import {cities} from '../../mocks/cities.js';
import {email} from '../../mocks/user.js';
import Card from './card.jsx';
import {offers} from '../../mocks/offers.js';

const mockStore = configureStore([]);

it(`Card snapshot`, () => {
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
          <Card
            offer={offers[0]}
            onCardHover={() => {}}
            onTitleClick={() => {}}
            cardType={CARD_TYPE.MAIN}
          />
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
