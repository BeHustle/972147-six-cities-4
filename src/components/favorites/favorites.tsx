import * as React from 'react';
import {Link} from 'react-router-dom';
import {getFavoriteCities, getFavoriteOffers} from '../../reducer/data/data.selectors';
import AppRoute from '../../routes';
import EmptyFavoritesScreen from '../empty-favorites-screen/empty-favorites-screen';
import FavoritesList from '../favorites-list/favorites-list';
import Header from '../header/header';
import {connect} from 'react-redux';
import {Operation as DataOperation} from '../../reducer/data/data.reducer';
import {CityInterface, OfferInterface} from "../../types";

interface Props {
  offers: Array<OfferInterface>;
  cities: Array<CityInterface>;
  onFavoritesDidMount: () => void;
  onFavoriteClick: () => void;
}

class Favorites extends React.PureComponent<Props, {}> {
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
              <FavoritesList
                onFavoriteClick={onFavoriteClick}
                offers={offers}
                cities={cities}
              />
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
