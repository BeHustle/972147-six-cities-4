import * as React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import {getAppStatus} from '../../reducer/app/app.selectors';
import {getAuthStatus} from '../../reducer/user/user.selectors';
import AppRoute from '../../routes';
import CardDetail from '../card-detail/card-detail';
import Favorites from '../favorites/favorites';
import Main from '../main/main';
import {AppStatus, AuthStatus} from '../../constants';
import {connect} from 'react-redux';
import FailLoad from '../fail-load/fail-load';
import Loading from '../loading/loading';
import NotFound from '../not-found/not-found';
import PublicRoute from '../public-route/public-route';
import SingIn from '../sign-in/sign-in';
import {history} from '../../history';
import PrivateRoute from '../private-route/private-route';
import {Operation as DataOperation} from '../../reducer/data/data.reducer';

interface Props {
  appStatus: string;
  authStatus: string;
  onFavoriteClick: (offerId: number, status: string) => void;
}

class App extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  _handleFavoriteClick(offerId, status) {
    if (this.props.authStatus === AuthStatus.AUTH) {
      this.props.onFavoriteClick(offerId, status);
    } else {
      history.push(AppRoute.LOGIN);
    }
  }

  render() {
    switch (this.props.appStatus) {
      case AppStatus.LOADING:
        return <Loading />;
      case AppStatus.FAIL_LOAD:
        return <FailLoad />;
      case AppStatus.SUCCESS_LOAD:
        return (
          <Router history={history}>
            <Switch>
              <Route exact path={AppRoute.MAIN}>
                <Main onFavoriteClick={this._handleFavoriteClick} />
              </Route>
              <Route
                exact
                path={`${AppRoute.OFFER}/:offerId`}
                render={(props) =>
                  <CardDetail
                    offerId={parseInt(props.match.params.offerId, 10)}
                    onFavoriteClick={this._handleFavoriteClick}
                  />
                }
              />
              <PublicRoute exact path={AppRoute.LOGIN}>
                <SingIn />
              </PublicRoute>
              <PrivateRoute exact path={AppRoute.FAVORITES}>
                <Favorites
                  onFavoriteClick={this._handleFavoriteClick}
                />
              </PrivateRoute>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        );
      default:
        return ``;
    }
  }
}

const mapStateToProps = (state) => ({
  appStatus: getAppStatus(state),
  authStatus: getAuthStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteClick(offerId, status) {
    dispatch(DataOperation.addFavoriteOffer({
      hotelId: offerId,
      status
    }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
