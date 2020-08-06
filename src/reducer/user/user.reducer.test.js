import MockAdapter from 'axios-mock-adapter';
import {userAdapter} from '../../adapters/user-adapter.js';
import {createAPI} from '../../api/api.js';
import {AuthStatus} from '../../constants.js';
import {userInfo, serverUserInfo, postUserInfo} from '../../test-mocks/user.js';
import {reducer, setUserInfo, setAuthStatus, Operation} from './user.reducer.js';

describe(`User reducer`, () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      userInfo: null,
      authStatus: AuthStatus.NO_AUTH
    };
  });

  it(`without additional parameters should return initial state`, () => {
    expect(reducer()).toEqual(initialState);
  });

  it(`should change authStatus to a given value`, () => {
    expect(reducer(initialState, setAuthStatus(AuthStatus.AUTH)))
      .toEqual(Object.assign({}, initialState, {authStatus: AuthStatus.AUTH}));
  });

  it(`should change userInfo to a given value`, () => {
    expect(reducer(initialState, setUserInfo(userInfo)))
      .toEqual(Object.assign({}, initialState, {userInfo}));
  });
});

describe(`User reducer API methods`, () => {
  let api;
  let apiMock;
  let dispatch;

  beforeEach(() => {
    api = createAPI();
    apiMock = new MockAdapter(api);
    dispatch = jest.fn();
  });

  it(`Should make a correct API call GET to /login. CASE auth`, () => {
    const userInfoLoader = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, serverUserInfo);

    return userInfoLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toBeCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, setUserInfo(userAdapter(serverUserInfo)));
        expect(dispatch).toHaveBeenNthCalledWith(2, setAuthStatus(AuthStatus.AUTH));
      });
  });

  it(`Should make a correct API call GET to /login. CASE no auth`, () => {
    const offersLoader = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(401);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {})
      .catch(() => {
        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(setAuthStatus(AuthStatus.NO_AUTH));
      });
  });

  it(`Should make a correct API call POST to /login. CASE correct`, () => {
    const offersLoader = Operation.login(postUserInfo);

    apiMock
      .onPost(`/login`)
      .reply(200, serverUserInfo);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toBeCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, setUserInfo(userAdapter(serverUserInfo)));
        expect(dispatch).toHaveBeenNthCalledWith(2, setAuthStatus(AuthStatus.AUTH));
      });
  });
});
