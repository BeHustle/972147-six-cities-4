import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import AppRoute from '../../routes';
import {AuthStatus} from '../../constants';
import {getAuthStatus} from '../../reducer/user/user.selectors';
import PropTypes from 'prop-types';


const PrivateRoute = ({children, path, exact, authStatus}) =>
  <Route path={path} exact={exact}>
    {authStatus === AuthStatus.AUTH
      ? children
      : <Redirect to={AppRoute.LOGIN}/>}
  </Route>;

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  authStatus: PropTypes.oneOf(Object.values(AuthStatus)),
  children: PropTypes.object
};

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
