import {userAdapter} from '../../adapters/user-adapter';
import {AuthStatus, ErrorCode} from '../../constants';

const initialState = {
  userInfo: null,
  authStatus: AuthStatus.LOADING
};

const ActionTypes = {
  SET_USER_INFO: `SET_USER_INFO`,
  SET_AUTH_STATUS: `SET_AUTH_STATUS`
};

export const setUserInfo = (info) => ({
  type: ActionTypes.SET_USER_INFO,
  payload: info,
});

export const setAuthStatus = (status) => ({
  type: ActionTypes.SET_AUTH_STATUS,
  payload: status
});

export const Operation = {
  checkAuth: () => async (dispatch, getState, api) => {
    try {
      const response = await api.get(`/login`);
      dispatch(setUserInfo(userAdapter(response.data)));
      dispatch(setAuthStatus(AuthStatus.AUTH));
    } catch (e) {
      const {response} = e;
      if (response.status === ErrorCode.UNAUTHORIZED) {
        dispatch(setAuthStatus(AuthStatus.NO_AUTH));
        throw e;
      }
      dispatch(setAuthStatus(AuthStatus.FAIL_LOAD));
      throw e;
    }
  },
  login: ({email, password}) => async (dispatch, getState, api) => {
    try {
      const response = await api.post(`/login`, {email, password});
      dispatch(setUserInfo(userAdapter(response.data)));
      dispatch(setAuthStatus(AuthStatus.AUTH));
    } catch (e) {
      throw e;
    }
  }
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.SET_AUTH_STATUS:
      return Object.assign({}, state, {authStatus: action.payload});
    case ActionTypes.SET_USER_INFO:
      return Object.assign({}, state, {userInfo: action.payload});
    default:
      return state;
  }
};
