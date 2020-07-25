import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CardList from '../card-list/card-list.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import Header from '../header/header.jsx';
import Map from '../map/map.jsx';
import SortList from '../sort-list/sort-list.jsx';

const Main = ({onCardTitleClick, countOffers, cityName}) =>
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

            <b className="places__found">{countOffers} places to stay in {cityName}</b>

            <SortList />

            <CardList onCardTitleClick={onCardTitleClick}/>
          </section>
          <div className="cities__right-section">
            <Map />
          </div>
        </div>
      </div>
    </main>
  </div>;

Main.propTypes = {
  onCardTitleClick: PropTypes.func.isRequired,
  countOffers: PropTypes.number.isRequired,
  cityName: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  countOffers: state.offers.filter((offer) => offer.cityId === state.city.id).length,
  cityName: state.city.name
});

export default connect(mapStateToProps)(Main);
