import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from './not-found.tsx';
import {Router} from 'react-router-dom';
import {history} from '../../history';


it(`Render notFound screen`, () => {
  const tree = renderer
    .create(<Router history={history}>
      <NotFound />
    </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
