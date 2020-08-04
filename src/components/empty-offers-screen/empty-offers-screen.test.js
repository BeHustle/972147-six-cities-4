import React from 'react';
import renderer from 'react-test-renderer';
import EmptyOffersScreen from './empty-offers-screen.jsx';

it(`Render empty offers screen`, () => {
  const tree = renderer
    .create(<EmptyOffersScreen />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
