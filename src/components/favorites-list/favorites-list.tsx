import * as React from 'react';
import {CardType} from '../../constants';
import Card from '../card/card';
import {CityInterface, OfferInterface} from "../../types";

const getOffersByCityId = (offers, cityId) => offers.filter((offer) => offer.cityId === cityId);

interface Props {
  offers: Array<OfferInterface>;
  cities: Array<CityInterface>;
  onFavoriteClick: () => void;
  onCardTitleClick: () => void;
}

const FavoritesList: React.FunctionComponent<Props> = ({offers, cities, onFavoriteClick, onCardTitleClick}: Props) =>
  <ul className="favorites__list">
    {cities.map((city) =>
      getOffersByCityId(offers, city.id).length
        ? <li key={city.id} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city.name}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {getOffersByCityId(offers, city.id).map((offer) =>
              <Card
                key={offer.id}
                onCardHover={() => null}
                onFavoriteClick={onFavoriteClick}
                onTitleClick={onCardTitleClick}
                offer={offer}
                cardType={CardType.FAVORITE}
              />)}
          </div>
        </li>
        : ``
    )}
  </ul>;

export default FavoritesList;
