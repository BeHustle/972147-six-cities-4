import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {CitiesList} from './cities-list';
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
