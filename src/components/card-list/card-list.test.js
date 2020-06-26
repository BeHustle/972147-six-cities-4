import React from 'react';
import renderer from 'react-test-renderer';
import CardList from './card-list.jsx';
import {Mock} from '../../mocks/test-mock.js';

it(`Render Cards list`, () => {
  const tree = renderer
    .create(<CardList
      offers={Mock.cards}
      onCardTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
