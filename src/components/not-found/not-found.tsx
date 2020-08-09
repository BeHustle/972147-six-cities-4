import * as React from 'react';
import {Link} from 'react-router-dom';
import AppRoute from '../../routes';

const NotFound: React.FunctionComponent<{}> = () => <h1>Page not found. <Link to={AppRoute.MAIN}>Go to main</Link></h1>;

export default NotFound;
