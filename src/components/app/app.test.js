import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

jest.mock(`../map/map.jsx`, () => `Map`);

it(`Render App`, () => {
  const tree = renderer
    .create(<App />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
