import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {PrivateRoute} from './private-route';
import {MemoryRouter} from "react-router";
import AppRoute from '../../routes';
import {AuthStatus} from '../../constants';

configure({adapter: new Adapter()});

describe(`PrivateRoute`, () => {
  it(`Should render PrivateRoute if user has been authenticated`, () => {
    const MockComponent = () => <div />;
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
    const MockComponent = () => <div />;
    const wrapper = mount(
        <MemoryRouter initialEntries={[AppRoute.FAVORITES]}>
          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            authStatus={AuthStatus.NO_AUTH}>
            <MockComponent />
          </PrivateRoute>
        </MemoryRouter>
    );

    const history = wrapper.find(`Router`).prop(`history`);
    expect(wrapper.exists(MockComponent)).toBe(false);
    expect(history.location.pathname).toBe(AppRoute.LOGIN);
  });

  it(`Should render Loading component if auth status is Loading`, () => {
    const MockComponent = () => <div />;
    const wrapper = mount(
        <MemoryRouter initialEntries={[AppRoute.FAVORITES]}>
          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            authStatus={AuthStatus.LOADING}>
            <MockComponent />
          </PrivateRoute>
        </MemoryRouter>
    );

    expect(wrapper.exists(MockComponent)).toBe(false);
    expect(wrapper.exists(`Loading`)).toBe(true);
  });

  it(`Should render FailLoad component if auth status is fail load`, () => {
    const MockComponent = () => <div />;
    const wrapper = mount(
        <MemoryRouter initialEntries={[AppRoute.FAVORITES]}>
          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            authStatus={AuthStatus.FAIL_LOAD}>
            <MockComponent />
          </PrivateRoute>
        </MemoryRouter>
    );

    expect(wrapper.exists(MockComponent)).toBe(false);
    expect(wrapper.exists(`FailLoad`)).toBe(true);
  });
});
