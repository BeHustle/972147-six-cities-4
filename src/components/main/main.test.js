import React from 'react';
import renderer from 'react-test-renderer';
import {Mock} from '../../mocks/test-mock.js';
import Main from './main.jsx';

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      countOffers={Mock.countOffers}
      userEmail={Mock.userEmail}
      onCardTitleClick={() => {}}
      offers={Mock.cards}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
