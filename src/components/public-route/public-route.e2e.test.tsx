import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {PublicRoute} from "./public-route";
import {MemoryRouter} from "react-router";
import AppRoute from '../../routes';
import {AuthStatus} from '../../constants';

configure({adapter: new Adapter()});

describe(`PublicRoute`, () => {
  it(`Should render PublicRoute if user has not been authenticated`, () => {
    const MockComponent = () => <div />;
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

  it(`Should redirect to Login if user is not authenticated`, () => {
    const MockComponent = () => <div />;
    const wrapper = mount(
        <MemoryRouter initialEntries={[AppRoute.LOGIN]}>
          <PublicRoute
            exact
            path={AppRoute.LOGIN}
            authStatus={AuthStatus.AUTH}>
            <MockComponent />
          </PublicRoute>
        </MemoryRouter>
    );

    const history = wrapper.find(`Router`).prop(`history`);
    expect(wrapper.exists(MockComponent)).toBe(false);
    expect(history.location.pathname).toBe(AppRoute.MAIN);
  });

  it(`Should render Loading component if auth status is Loading`, () => {
    const MockComponent = () => <div />;
    const wrapper = mount(
        <MemoryRouter initialEntries={[AppRoute.LOGIN]}>
          <PublicRoute
            exact
            path={AppRoute.LOGIN}
            authStatus={AuthStatus.LOADING}>
            <MockComponent />
          </PublicRoute>
        </MemoryRouter>
    );

    expect(wrapper.exists(MockComponent)).toBe(false);
    expect(wrapper.exists(`Loading`)).toBe(true);
  });

  it(`Should render FailLoad component if auth status is fail load`, () => {
    const MockComponent = () => <div />;
    const wrapper = mount(
        <MemoryRouter initialEntries={[AppRoute.LOGIN]}>
          <PublicRoute
            exact
            path={AppRoute.LOGIN}
            authStatus={AuthStatus.FAIL_LOAD}>
            <MockComponent />
          </PublicRoute>
        </MemoryRouter>
    );

    expect(wrapper.exists(MockComponent)).toBe(false);
    expect(wrapper.exists(`FailLoad`)).toBe(true);
  });
});
