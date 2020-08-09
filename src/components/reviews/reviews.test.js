import * as React from 'react';
import renderer from 'react-test-renderer';
import {AuthStatus} from '../../constants';
import {Reviews} from './reviews.tsx';
import {reviews} from '../../test-mocks/reviews';

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
