import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {getAppStatus} from '../../reducer/app/app.selectors.js';
import CardDetail from '../card-detail/card-detail.jsx';
import Main from '../main/main.jsx';
import {Screen, AppStatus} from '../../constants.js';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SingIn from '../sign-in/sign-in.jsx';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      screen: Screen.MAIN,
      offerId: null,
    };
    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleLoginClick = this._handleLoginClick.bind(this);
  }

  _handleCardClick(id) {
    this.setState({
      screen: Screen.OFFER,
      offerId: id
    });
  }

  _handleLoginClick() {
    this.setState({
      screen: Screen.LOGIN,
    });
  }

  _renderApp() {
    switch (this.props.status) {
      case AppStatus.LOADING:
        return <h1>Загрузка...</h1>;
      case AppStatus.FAIL_LOAD:
        return <h1>Произошла ошибка при загрузке приложения. Попробуйте <a href="/">обновить страницу</a></h1>;
      case AppStatus.SUCCESS_LOAD:
        return this._renderScreen();
      default:
        return ``;
    }
  }

  _renderScreen() {
    switch (this.state.screen) {
      case Screen.MAIN:
        return <Main onCardTitleClick={this._handleCardClick} onSignInClick={this._handleLoginClick} />;
      case Screen.OFFER:
        return <CardDetail onCardTitleClick={this._handleCardClick} offerId={this.state.offerId} onSignInClick={this._handleLoginClick}/>;
      case Screen.LOGIN:
        return <SingIn />;
      default:
        return null;
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer">
            <CardDetail onCardTitleClick={this._handleCardClick} offerId={1} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  status: PropTypes.oneOf(Object.values(AppStatus))
};

const mapStateToProps = (state) => ({
  status: getAppStatus(state)
});

export default connect(mapStateToProps)(App);
