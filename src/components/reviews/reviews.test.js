import React from 'react';
import renderer from 'react-test-renderer';
import {AuthStatus} from '../../constants.js';
import {Reviews} from './reviews.jsx';
import {reviews} from '../../test-mocks/reviews.js';

it(`Render Reviews list`, () => {
  const tree = renderer
    .create(<Reviews
      offerId={1}
      reviews={reviews}
      authStatus={AuthStatus.NO_AUTH}
      onReviewsMount={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
