import React from 'react';
import renderer from 'react-test-renderer';
import {cities} from '../../test-mocks/cities.js';
import {offers} from '../../test-mocks/offers.js';
import FavoritesList from './favorites-list.jsx';

it(`Render empty favorites list`, () => {
  const tree = renderer
    .create(<FavoritesList
      offers={offers}
      cities={cities}
      onFavoriteClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
