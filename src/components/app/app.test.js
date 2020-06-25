import React from 'react';
import renderer from 'react-test-renderer';
import {Mock} from '../../mocks/test-mock.js';
import App from './app.jsx';

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      countOffers={Mock.countOffers}
      userEmail={Mock.userEmail}
      onCardTitleClick={() => {}}
      offers={Mock.cards}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
