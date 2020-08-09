import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {AuthStatus} from '../../constants';
import {Header} from './header';
import {userInfo} from '../../test-mocks/user';
import {Router} from 'react-router-dom';
import {history} from '../../history';

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
