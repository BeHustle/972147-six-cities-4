import React from 'react';
import renderer from 'react-test-renderer';
import {Mock} from '../../mocks/test-mock.js';
import CardDetail from './card-detail.jsx';

it(`Render Card Detail`, () => {
  const tree = renderer
    .create(<CardDetail
      userEmail={Mock.userEmail}
      offer={Mock.cards[0]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
