import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Mock} from '../../mocks/test-mock.js';
import Main from './main.jsx';

jest.mock(`../map/map.jsx`, () => `map`);

const mockStore = configureStore([]);

it(`Render Main`, () => {
  const store = mockStore({
    offers: Mock.offers,
    city: Mock.cities[0],
    cities: Mock.cities,
    userEmail: Mock.userEmail
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
