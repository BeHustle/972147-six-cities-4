import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {PrivateRoute} from "./private-route";
import {AuthStatus} from '../../constants';
import AppRoute from '../../routes';
import {Router} from 'react-router-dom';
import {history} from '../../history';

const MockComponent = () => <div />;

it(`Render private route`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <PrivateRoute
            authStatus={AuthStatus.AUTH}
            path={AppRoute.FAVORITES}
            exact={true}>
            <MockComponent />
          </PrivateRoute>
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
