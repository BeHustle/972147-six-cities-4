import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {CardType} from '../../constants';
import Map from './map';
import {cities} from '../../test-mocks/cities';
import {offers} from '../../test-mocks/offers';


it(`Render Map`, () => {
  const createMapBlock = () => {
    const section = global.document.createElement(`section`);
    section.setAttribute(`id`, `map-${CardType.MAIN}`);
    global.document.body.appendChild(section);
  };
  createMapBlock();
  const tree = renderer
    .create(
        <Map
          type={CardType.MAIN}
          offers={offers}
          coordinates={cities[0].coordinates}
          activeOfferId={1}
          zoom={5}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
