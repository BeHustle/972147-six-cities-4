import * as React from 'react';
import {connect} from 'react-redux';
import {setActiveCity} from '../../reducer/app/app.reducer';
import {getActiveCity} from '../../reducer/app/app.selectors';
import {getCities} from '../../reducer/data/data.selectors';
import {CityInterface} from "../../types";

const ACTIVE_CITY_CLASS = `tabs__item--active`;

interface Props {
  cities: Array<CityInterface>;
  activeCityId: number;
  onCityLinkClick: (evt: object, item: object) => void;
}

const CitiesList: React.FunctionComponent<Props> = ({cities, activeCityId, onCityLinkClick}: Props) =>
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
