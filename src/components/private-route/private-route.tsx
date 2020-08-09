import * as React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import {connect} from "react-redux";
import AppRoute from '../../routes';
import {AuthStatus} from '../../constants';
import {getAuthStatus} from '../../reducer/user/user.selectors';

type Props = RouteProps & {
  authStatus: string;
  children: () => React.ReactChildren;
}

const PrivateRoute: React.FunctionComponent<Props> = ({children, path, exact, authStatus}: Props) =>
  <Route path={path} exact={exact}>
    {authStatus === AuthStatus.AUTH
      ? children
      : <Redirect to={AppRoute.LOGIN}/>}
  </Route>;

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
