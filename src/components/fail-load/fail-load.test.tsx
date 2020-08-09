import * as React from 'react';
import * as renderer from 'react-test-renderer';
import FailLoad from './fail-load';

it(`Render loading screen`, () => {
  const tree = renderer
    .create(<FailLoad />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
