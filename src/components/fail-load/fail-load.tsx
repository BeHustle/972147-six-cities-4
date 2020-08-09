import * as React from 'react';
import AppRoute from '../../routes';

const FailLoad: React.FunctionComponent<{}> = () =>
  <h1>
    Error while loading. Try refresh page or
    <a style={{color: `tomato`, textDecoration: `underline`}} href={AppRoute.MAIN}>go to main</a>
  </h1>;

export default FailLoad;
