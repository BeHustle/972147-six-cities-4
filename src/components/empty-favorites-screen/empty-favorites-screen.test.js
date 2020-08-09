import React from 'react';
import renderer from 'react-test-renderer';
import EmptyFavoritesScreen from './empty-favorites-screen.tsx';

it(`Render empty favorites screen`, () => {
  const tree = renderer
    .create(<EmptyFavoritesScreen />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
