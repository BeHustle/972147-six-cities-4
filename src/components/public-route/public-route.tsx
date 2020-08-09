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

const PublicRoute: React.FunctionComponent<Props> = ({children, path, exact, authStatus}: Props) =>
  <Route path={path} exact={exact}>
    {authStatus === AuthStatus.NO_AUTH
      ? children
      : <Redirect to={AppRoute.MAIN}/>}
  </Route>;


const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
});


export {PublicRoute};
export default connect(mapStateToProps)(PublicRoute);
