import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {PublicRoute} from "./public-route";
import {AuthStatus} from '../../constants';
import AppRoute from '../../routes';
import {Router} from 'react-router-dom';
import {history} from '../../history';

it(`Render public route`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <PublicRoute
            authStatus={AuthStatus.NO_AUTH}
            path={AppRoute.LOGIN}
            exact={true}>
            <div />
          </PublicRoute>
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
