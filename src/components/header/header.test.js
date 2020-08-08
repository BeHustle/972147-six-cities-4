import React from 'react';
import renderer from 'react-test-renderer';
import {AuthStatus} from '../../constants.js';
import {Header} from './header.jsx';
import {userInfo} from '../../test-mocks/user.js';
import {Router} from 'react-router-dom';
import {history} from '../../history.js';

it(`Render Header`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Header userInfo={userInfo} authStatus={AuthStatus.AUTH}/>
        </Router>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
