import React from 'react';
import renderer from 'react-test-renderer';
import {CommentStatus} from '../../constants';
import {AddReview} from './add-review.tsx';

it(`Render review form`, () => {
  const tree = renderer
    .create(<AddReview
      offerId={1}
      onFormSubmit={() => {}}
      resetCommentStatus={() => {}}
      commentStatus={CommentStatus.NOT_SEND}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
