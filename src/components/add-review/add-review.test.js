import React from 'react';
import renderer from 'react-test-renderer';
import AddReview from './add-review.jsx';

it(`Render review form`, () => {
  const tree = renderer
    .create(<AddReview />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
