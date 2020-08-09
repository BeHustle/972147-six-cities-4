import React from 'react';
import renderer from 'react-test-renderer';
import {CitiesList} from './cities-list.tsx';
import {cities} from '../../test-mocks/cities';


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
