import React from 'react';
import renderer from 'react-test-renderer';
import {Mock} from '../../mock/test-mock.js';
import App from './app.jsx';

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      countOffers={Mock.countOffers}
      userEmail={Mock.userEmail}
      cardPrice={Mock.cardPrice}
      cardName={Mock.cardName}
      cardType={Mock.cardType}
      onCardTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
