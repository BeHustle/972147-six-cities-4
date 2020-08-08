import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import AppRoute from '../../routes.js';
import {AuthStatus} from '../../constants.js';
import {getAuthStatus} from '../../reducer/user/user.selectors.js';
import PropTypes from 'prop-types';


const PublicRoute = ({children, path, exact, authStatus}) =>
  <Route path={path} exact={exact}>
    {authStatus === AuthStatus.NO_AUTH
      ? children
      : <Redirect to={AppRoute.MAIN}/>}
  </Route>;

PublicRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  authStatus: PropTypes.oneOf(Object.values(AuthStatus)),
  children: PropTypes.object
};

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
});


export {PublicRoute};
export default connect(mapStateToProps)(PublicRoute);
