import React from 'react';
import renderer from 'react-test-renderer';
import {CARD_TYPE} from '../../constants.js';
import {Card} from './card.jsx';
import {offers} from '../../test-mocks/offers.js';


it(`Card snapshot`, () => {
  const tree = renderer
    .create(
        <Card
          offer={offers[0]}
          onCardHover={() => {}}
          onFavoriteClick={() => {}}
          onTitleClick={() => {}}
          cardType={CARD_TYPE.MAIN}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
