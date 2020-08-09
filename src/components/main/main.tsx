import * as React from 'react';
import {connect} from 'react-redux';
import {CardType} from '../../constants';
import {getActiveCity} from '../../reducer/app/app.selectors';
import {getOffersByCity} from '../../reducer/data/data.selectors';
import CardList from '../card-list/card-list';
import CitiesList from '../cities-list/cities-list';
import EmptyOffersScreen from '../empty-offers-screen/empty-offers-screen';
import Header from '../header/header';
import Map from '../map/map';
import SortList from '../sort-list/sort-list';
import {CityInterface, OfferInterface} from "../../types";

interface Props {
  onCardTitleClick: () => void;
  offers: Array<OfferInterface>;
  city: CityInterface;
  onFavoriteClick: () => void;
}

const Main: React.FunctionComponent<Props> = ({onCardTitleClick, city, offers, onFavoriteClick}: Props) =>
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

const mapStateToProps = (state) => ({
  offers: getOffersByCity(state),
  city: getActiveCity(state)
});

export default connect(mapStateToProps)(Main);
