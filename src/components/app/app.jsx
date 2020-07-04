import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from '../main/main.jsx';
import CardDetail from '../card-detail/card-detail.jsx';
import {offers} from '../../mocks/offers.js';
import {email} from '../../mocks/user.js';
import {Cities, Screen} from '../../constants.js';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      screen: Screen.MAIN,
      offerId: null,
    };
    this._handleCardClick = this._handleCardClick.bind(this);
  }

  _handleCardClick(id) {
    this.setState({
      screen: Screen.OFFER,
      offerId: id
    });
  }

  _renderScreen() {
    switch (this.state.screen) {
      case Screen.MAIN:
        return (
          <Main
            countOffers={128}
            userEmail={email}
            onCardTitleClick={this._handleCardClick}
            offers={offers}
            city={Cities.AMSTERDAM}
          />
        );
      case Screen.OFFER:
        return (
          <CardDetail
            userEmail={email}
            offer={offers.find((it) => it.id === this.state.offerId)}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderScreen()}
          </Route>
          <Route exact path="/offer">
            <CardDetail
              userEmail={email}
              offer={offers[0]}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
