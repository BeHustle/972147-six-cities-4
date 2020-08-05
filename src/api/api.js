import axios from 'axios';

const URL = `https://4.react.pages.academy/six-cities`;
const TIMEOUT = 5000;

export const createAPI = () =>
  axios.create({
    baseURL: URL,
    timeout: TIMEOUT,
    withCredentials: true
  });

