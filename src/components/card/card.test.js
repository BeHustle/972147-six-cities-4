import React from 'react';
import renderer from 'react-test-renderer';
import Card from './card.jsx';
import {Mock} from '../../mock/test-mock.js';

it(`Render Card`, () => {
  const tree = renderer
    .create(<Card
      name={Mock.cardName}
      price={Mock.cardPrice}
      type={Mock.cardType}
      onTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
