import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CardDetail from '../card-detail/card-detail.jsx';
import Main from '../main/main.jsx';
import {CARD_TYPES, Screen} from '../../constants.js';

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
    const {offers} = this.props;
    switch (this.state.screen) {
      case Screen.MAIN:
        return (
          <Main onCardTitleClick={this._handleCardClick}/>
        );
      case Screen.OFFER:
        return (
          <CardDetail offer={offers.find((it) => it.id === this.state.offerId)}/>
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
            <CardDetail offer={this.props.offers[0]} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.oneOf(CARD_TYPES).isRequired,
    isPremium: PropTypes.bool.isRequired,
    inBookmarks: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number),
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    rooms: PropTypes.string.isRequired,
    guests: PropTypes.string.isRequired,
    facilities: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.exact({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      isSuper: PropTypes.bool.isRequired
    }).isRequired,
    text: PropTypes.arrayOf(PropTypes.string).isRequired,
    cityId: PropTypes.number.isRequired
  })).isRequired,
};

const mapStateToProps = (state) => {
  return {
    offers: state.offers,
  };
};

export default connect(mapStateToProps, null)(App);
