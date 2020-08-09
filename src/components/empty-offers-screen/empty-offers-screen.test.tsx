import * as React from 'react';
import * as renderer from 'react-test-renderer';
import EmptyOffersScreen from './empty-offers-screen';

it(`Render empty offers screen`, () => {
  const tree = renderer
    .create(<EmptyOffersScreen />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
