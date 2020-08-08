import React from 'react';
import {Link} from 'react-router-dom';
import {HouseType} from '../../constants.js';
import {getFavoriteCities, getFavoriteOffers} from '../../reducer/data/data.selectors.js';
import AppRoute from '../../routes.js';
import EmptyFavoritesScreen from '../empty-favorites-screen/empty-favorites-screen.jsx';
import FavoritesList from '../favorites-list/favorites-list.jsx';
import Header from '../header/header.jsx';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Operation as DataOperation} from '../../reducer/data/data.reducer.js';

class Favorites extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFavoritesDidMount();
  }

  render() {
    const {offers, cities, onFavoriteClick} = this.props;
    return <div className={`page ${offers.length || `page--favorites-empty`}`}>

      <Header />

      {offers.length
        ? <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList onFavoriteClick={onFavoriteClick} offers={offers} cities={cities} />
            </section>
          </div>
        </main>
        : <EmptyFavoritesScreen />}

      <footer className="footer container">
        <Link to={AppRoute.MAIN} className="footer__logo-link">
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>;
  }
}


Favorites.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.oneOf(HouseType).isRequired,
    isPremium: PropTypes.bool.isRequired,
    inBookmarks: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number.isRequired,
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
  })),
  cities: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired
  })),
  onFavoritesDidMount: PropTypes.func.isRequired,
  onFavoriteClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  offers: getFavoriteOffers(state),
  cities: getFavoriteCities(state)
});

const mapDispatchToProps = (dispatch) => ({
  onFavoritesDidMount() {
    dispatch(DataOperation.loadFavoriteData());
  },
});

export {Favorites};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
