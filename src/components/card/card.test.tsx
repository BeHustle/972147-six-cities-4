import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {CardType} from '../../constants';
import {Card} from './card';
import {offers} from '../../test-mocks/offers';
import {Router} from 'react-router-dom';
import {history} from '../../history';

it(`Card snapshot`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Card
            offer={offers[0]}
            onCardHover={jest.fn()}
            onFavoriteClick={jest.fn()}
            cardType={CardType.MAIN}/>
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
