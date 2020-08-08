import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setActiveCity} from '../../reducer/app/app.reducer.js';
import {getActiveCity} from '../../reducer/app/app.selectors.js';
import {getCities} from '../../reducer/data/data.selectors.js';

const ACTIVE_CITY_CLASS = `tabs__item--active`;

const CitiesList = ({cities, activeCityId, onCityLinkClick}) =>
  <section className="locations container">
    <ul className="locations__list tabs__list">
      {cities.map((item) =>
        <li key={item.id} className="locations__item">
          <a className={`locations__item-link tabs__item ${activeCityId === item.id && ACTIVE_CITY_CLASS}`}
            onClick={(evt) => onCityLinkClick(evt, item)}
            href="#">
            <span>{item.name}</span>
          </a>
        </li>
      )}
    </ul>
  </section>;

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired
  })).isRequired,
  activeCityId: PropTypes.number.isRequired,
  onCityLinkClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onCityLinkClick(evt, city) {
    evt.preventDefault();
    dispatch(setActiveCity(city));
  }
});

const mapStateToProps = (state) => ({
  cities: getCities(state),
  activeCityId: getActiveCity(state).id
});

export {CitiesList};

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
