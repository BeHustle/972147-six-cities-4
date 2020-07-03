import React from 'react';
import renderer from 'react-test-renderer';
import {Mock} from '../../mocks/test-mock.js';
import Map from './map.jsx';

jest.mock(`../map/map.jsx`, () => `Map`);

it(`Render Map`, () => {
  const tree = renderer
    .create(<Map
      city={Mock.city}
      offers={Mock.cards}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
