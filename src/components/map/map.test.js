import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Mock} from '../../mocks/test-mock.js';
import Map from './map.jsx';

jest.mock(`../map/map.jsx`, () => `Map`);

const mockStore = configureStore([]);

it(`Render Map`, () => {
  const store = mockStore({
    offers: Mock.offers,
    city: Mock.cities[0]
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Map />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
