import React from 'react';
import renderer from 'react-test-renderer';
import EmptyFavoritesScreen from './empty-favorites-screen.jsx';

it(`Render empty favorites screen`, () => {
  const tree = renderer
    .create(<EmptyFavoritesScreen />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
