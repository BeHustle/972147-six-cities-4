import React from 'react';
import renderer from 'react-test-renderer';
import {CardType} from '../../constants';
import {Card} from './card.tsx';
import {offers} from '../../test-mocks/offers';


it(`Card snapshot`, () => {
  const tree = renderer
    .create(
        <Card
          offer={offers[0]}
          onCardHover={() => {}}
          onFavoriteClick={() => {}}
          onTitleClick={() => {}}
          cardType={CardType.MAIN}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
