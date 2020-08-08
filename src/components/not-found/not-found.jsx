import React from 'react';
import {Link} from 'react-router-dom';
import AppRoute from '../../routes.js';

const NotFound = () => <h1>Page not found. <Link to={AppRoute.MAIN}>Go to main</Link></h1>;

export default NotFound;
