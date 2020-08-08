import React from 'react';
import renderer from 'react-test-renderer';
import {CitiesList} from './cities-list.jsx';
import {cities} from '../../test-mocks/cities.js';


it(`Render Cities list`, () => {
  const tree = renderer
    .create(
        <CitiesList
          cities={cities}
          activeCityId={cities[0].id}
          onCityLinkClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
