import * as React from 'react';
import {CardType} from '../../constants';
import Card from '../card/card';
import {CityInterface, OfferInterface} from "../../types";
import {Link} from 'react-router-dom';
import AppRoute from '../../routes';

interface Props {
  offers: Array<OfferInterface>;
  cities: Array<CityInterface>;
  onFavoriteClick: () => void;
}

const getOffersByCityId = (offers, cityId) => offers.filter((offer) => offer.cityId === cityId);

const FavoritesList: React.FunctionComponent<Props> = ({offers, cities, onFavoriteClick}: Props) =>
  <ul className="favorites__list">
    {cities.map((city) =>
      getOffersByCityId(offers, city.id).length
        ? <li key={city.id} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link to={AppRoute.MAIN} className="locations__item-link">
                <span>{city.name}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {getOffersByCityId(offers, city.id).map((offer) =>
              <Card
                key={offer.id}
                onCardHover={() => null}
                onFavoriteClick={onFavoriteClick}
                offer={offer}
                cardType={CardType.FAVORITE}
              />)}
          </div>
        </li>
        : ``
    )}
  </ul>;

export default FavoritesList;
