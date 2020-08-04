import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {CARD_TYPE, HouseType} from '../../constants.js';
import {getActiveCity} from '../../reducer/app/app.selectors.js';
import {getOffersByCity} from '../../reducer/data/data.selectors.js';
import CardList from '../card-list/card-list.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import Header from '../header/header.jsx';
import Map from '../map/map.jsx';
import SortList from '../sort-list/sort-list.jsx';

const Main = ({onCardTitleClick, city, offers}) =>
  <div className="page page--gray page--main">
    <Header />
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CitiesList />
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {city.name}</b>
            <SortList />
            <CardList offers={offers} onCardTitleClick={onCardTitleClick} type={CARD_TYPE.MAIN}/>
          </section>
          <div className="cities__right-section">
            <Map offers={offers} type={CARD_TYPE.MAIN} coordinates={city.coordinates} />
          </div>
        </div>
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
    type: PropTypes.oneOf(HouseType),
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
  city: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
  })
};

const mapStateToProps = (state) => ({
  offers: getOffersByCity(state),
  city: getActiveCity(state)
});

export default connect(mapStateToProps)(Main);
