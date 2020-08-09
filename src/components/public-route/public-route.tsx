import * as React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import {connect} from "react-redux";
import AppRoute from '../../routes';
import {AuthStatus} from '../../constants';
import {getAuthStatus} from '../../reducer/user/user.selectors';
import Loading from "../loading/loading";
import FailLoad from "../fail-load/fail-load";

type Props = RouteProps & {
  authStatus: string;
  children: () => React.ReactChildren;
}

const PublicRoute: React.FunctionComponent<Props> = ({children, path, exact, authStatus}: Props) => {
  switch (authStatus) {
    case AuthStatus.LOADING:
      return <Route path={path} exact={exact}><Loading /></Route>;
    case AuthStatus.FAIL_LOAD:
      return <Route path={path} exact={exact}><FailLoad /></Route>;
    case AuthStatus.NO_AUTH:
      return <Route path={path} exact={exact}>{children}</Route>;
    case AuthStatus.AUTH:
      return <Route path={path} exact={exact}><Redirect to={AppRoute.MAIN} /></Route>;
    default:
      return <Route path={path} exact={exact} />;
  }
}

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
});


export {PublicRoute};
export default connect(mapStateToProps)(PublicRoute);
