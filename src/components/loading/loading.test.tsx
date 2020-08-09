import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Loading from './loading';

it(`Render loading screen`, () => {
  const tree = renderer
    .create(<Loading />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
