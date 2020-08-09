import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {PrivateRoute} from './private-route';
import {MemoryRouter} from "react-router";
import AppRoute from '../../routes';
import {AuthStatus} from '../../constants';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;

it(`Should render PrivateRoute if user has been authenticated`, () => {
  const wrapper = mount(
      <MemoryRouter initialEntries={[AppRoute.FAVORITES]}>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          authStatus={AuthStatus.AUTH}>
          <MockComponent />
        </PrivateRoute>
      </MemoryRouter>
  );

  expect(wrapper.exists(MockComponent)).toBe(true);
});

it(`Should redirect to Login if user is not authenticated`, () => {
  const wrapper = mount(
      <MemoryRouter initialEntries={[AppRoute.FAVORITES]}>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          authorizationStatus={AuthStatus.NO_AUTH}>
          <MockComponent />
        </PrivateRoute>
      </MemoryRouter>
  );

  const history = wrapper.find(`Router`).prop(`history`);
  expect(history.location.pathname).toBe(AppRoute.LOGIN);
});
