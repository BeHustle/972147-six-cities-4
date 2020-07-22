import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CardList from '../card-list/card-list.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import Header from '../header/header.jsx';
import Map from '../map/map.jsx';

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
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex="0">
                  Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"/>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex="0">Popular</li>
                <li className="places__option" tabIndex="0">Price: low to high</li>
                <li className="places__option" tabIndex="0">Price: high to low</li>
                <li className="places__option" tabIndex="0">Top rated first</li>
              </ul>
            </form>
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
