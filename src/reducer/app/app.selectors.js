import {Namespace} from '../namespace';

export const getActiveSort = (state) => state[Namespace.APP].activeSort;

export const getActiveCity = (state) => state[Namespace.APP].activeCity;

export const getAppStatus = (state) => state[Namespace.APP].appStatus;
