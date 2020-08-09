import {Namespace} from '../namespace';

export const getUserInfo = (state) => state[Namespace.USER].userInfo;

export const getAuthStatus = (state) => state[Namespace.USER].authStatus;
