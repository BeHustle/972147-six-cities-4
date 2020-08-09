import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {CardType, HouseType} from '../../constants';
import {getActiveCity} from '../../reducer/app/app.selectors';
import {getOffersByCity} from '../../reducer/data/data.selectors';
import CardList from '../card-list/card-list.tsx';
import CitiesList from '../cities-list/cities-list.tsx';
import EmptyOffersScreen from '../empty-offers-screen/empty-offers-screen.tsx';
import Header from '../header/header.tsx';
import Map from '../map/map';
import SortList from '../sort-list/sort-list';

const Main = ({onCardTitleClick, city, offers, onFavoriteClick}) =>
  <div className="page page--gray page--main">
    <Header />
    <main className={`page__main page__main--index ${offers.length || `page__main--index-empty`}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CitiesList />
      </div>
      <div className="cities">
        {offers.length
          ? <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">{offers.length} places to stay in {city.name}</b>

              <SortList />

              <CardList offers={offers} onFavoriteClick={onFavoriteClick} onCardTitleClick={onCardTitleClick} type={CardType.MAIN}/>
            </section>
            <div className="cities__right-section">
              <Map offers={offers} type={CardType.MAIN} coordinates={city.coordinates} zoom={city.zoom} />
            </div>
          </div>
          : <EmptyOffersScreen />}
      </div>
    </main>
  </div>;

Main.propTypes = {
  onCardTitleClick: PropTypes.func.isRequired,
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
  })).isRequired,
  city: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired
  }),
  onFavoriteClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  offers: getOffersByCity(state),
  city: getActiveCity(state)
});

export default connect(mapStateToProps)(Main);
