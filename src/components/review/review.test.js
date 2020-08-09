import React from 'react';
import renderer from 'react-test-renderer';
import Review from './review.tsx';
import {reviews} from '../../test-mocks/reviews.js';

it(`Render review form`, () => {
  const tree = renderer
    .create(<Review review={reviews[0]} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
