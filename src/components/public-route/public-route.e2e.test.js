import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {PublicRoute} from './public-route.jsx';
import {MemoryRouter} from "react-router";
import AppRoute from '../../routes.js';
import {AuthStatus} from '../../constants.js';

Enzyme.configure({
  adapter: new Adapter(),
});

const MockComponent = () => <div />;

it(`Should render PublicRoute if user is not authenticated`, () => {
  const wrapper = mount(
      <MemoryRouter initialEntries={[AppRoute.LOGIN]}>
        <PublicRoute
          exact
          path={AppRoute.LOGIN}
          authStatus={AuthStatus.NO_AUTH}>
          <MockComponent />
        </PublicRoute>
      </MemoryRouter>
  );

  expect(wrapper.exists(MockComponent)).toBe(true);
});

it(`Should redirect to Main if user has been authenticated`, () => {
  const wrapper = mount(
      <MemoryRouter initialEntries={[AppRoute.LOGIN]}>
        <PublicRoute
          exact
          path={AppRoute.LOGIN}
          authorizationStatus={AuthStatus.AUTH}>
          <MockComponent />
        </PublicRoute>
      </MemoryRouter>
  );

  const history = wrapper.find(`Router`).prop(`history`);
  expect(history.location.pathname).toBe(AppRoute.MAIN);
});
