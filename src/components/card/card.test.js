import React from 'react';
import renderer from 'react-test-renderer';
import Card from './card.jsx';
import {Mock} from '../../mocks/test-mock.js';

it(`Render Card`, () => {
  const tree = renderer
    .create(<Card
      offer={Mock.cards[0]}
      onCardHover={() => {}}
      onTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
