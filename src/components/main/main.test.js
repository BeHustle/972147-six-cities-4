import React from 'react';
import renderer from 'react-test-renderer';
import {Mock} from '../../mock/test-mock.js';
import Main from './main.jsx';

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      countOffers={Mock.countOffers}
      userEmail={Mock.userEmail}
      cardPrice={Mock.cardPrice}
      cardName={Mock.cardName}
      cardType={Mock.cardType}
      handleTitlePlaceClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
