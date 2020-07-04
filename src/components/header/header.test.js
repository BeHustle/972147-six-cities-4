import React from 'react';
import renderer from 'react-test-renderer';
import {Mock} from '../../mocks/test-mock.js';
import Header from './header.jsx';

it(`Render Header`, () => {
  const tree = renderer
    .create(<Header userEmail={Mock.userEmail} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
