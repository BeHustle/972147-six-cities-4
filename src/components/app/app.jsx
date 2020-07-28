import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import CardDetail from '../card-detail/card-detail.jsx';
import Main from '../main/main.jsx';
import {Screen} from '../../constants.js';

class App extends React.PureComponent {
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
          <Main onCardTitleClick={this._handleCardClick}/>
        );
      case Screen.OFFER:
        return (
          <CardDetail onCardTitleClick={this._handleCardClick} offerId={this.state.offerId}/>
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
            <CardDetail onCardTitleClick={this._handleCardClick} offerId={1} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
