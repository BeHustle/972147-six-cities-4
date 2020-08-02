import axios from 'axios';

const URL = `https://4.react.pages.academy/six-cities`;
const TIMEOUT = 5000;

export const createAPI = (dispatch = null) => {
  const api = axios.create({
    baseURL: URL,
    timeout: TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response) => response;
  const onFail = ({response}) => {
    throw response;
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};
