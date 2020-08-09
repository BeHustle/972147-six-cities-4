import React from 'react';
import {Router, Switch, Route, Link} from 'react-router-dom';
import {getAppStatus} from '../../reducer/app/app.selectors.js';
import {getAuthStatus} from '../../reducer/user/user.selectors.js';
import AppRoute from '../../routes.js';
import CardDetail from '../card-detail/card-detail.js';
import Favorites from '../favorites/favorites.js';
import Main from '../main/main.js';
import {AppStatus, AuthStatus} from '../../constants.js';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NotFound from '../not-found/not-found.js';
import PublicRoute from '../public-route/public-route.js';
import SingIn from '../sign-in/sign-in.js';
import {history} from '../../history.js';
import PrivateRoute from '../private-route/private-route.js';
import {Operation as DataOperation} from '../../reducer/data/data.reducer.js';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  _handleCardClick(id) {
    history.push(`${AppRoute.OFFER}/${id}`);
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
        return <h1>Loading...</h1>;
      case AppStatus.FAIL_LOAD:
        return <h1>Error while loading. Try <Link to={AppRoute.MAIN}>refresh page</Link></h1>;
      case AppStatus.SUCCESS_LOAD:
        return (
          <Router history={history}>
            <Switch>
              <Route exact path={AppRoute.MAIN}>
                <Main onCardTitleClick={this._handleCardClick} onFavoriteClick={this._handleFavoriteClick} />
              </Route>
              <Route
                exact
                path={`${AppRoute.OFFER}/:offerId`}
                render={(props) =>
                  <CardDetail
                    offerId={parseInt(props.match.params.offerId, 10)}
                    onCardTitleClick={this._handleCardClick}
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
                  onCardTitleClick={this._handleCardClick}
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

App.propTypes = {
  appStatus: PropTypes.oneOf(Object.values(AppStatus)),
  authStatus: PropTypes.oneOf(Object.values(AuthStatus)),
  onFavoriteClick: PropTypes.func.isRequired
};

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
