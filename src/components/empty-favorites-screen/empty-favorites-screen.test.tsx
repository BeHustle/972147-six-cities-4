import * as React from 'react';
import * as renderer from 'react-test-renderer';
import EmptyFavoritesScreen from './empty-favorites-screen';

it(`Render empty favorites screen`, () => {
  const tree = renderer
    .create(<EmptyFavoritesScreen />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
