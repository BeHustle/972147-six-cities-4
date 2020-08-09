import * as React from 'react';
import {connect} from 'react-redux';
import {CardType, Sorts} from '../../constants';
import {getActiveSort} from '../../reducer/app/app.selectors';
import Card from '../card/card';
import {OfferInterface} from "../../types";

const getCardListTypeClass = (type) => {
  switch (type) {
    case CardType.MAIN:
      return `cities__places-list tabs__content`;
    case CardType.CARD_DETAIL:
      return `near-places__list`;
    default:
      return ``;
  }
};

const sortCards = (cards, sortType) => {
  switch (sortType) {
    case Sorts.PRICE_ASC:
      return cards.sort((a, b) => a.price - b.price);
    case Sorts.PRICE_DESC:
      return cards.sort((a, b) => b.price - a.price);
    case Sorts.TOP_RATED:
      return cards.sort((a, b) => b.rating - a.rating);
    case Sorts.POPULAR:
      return cards.sort((a, b) => a.id - b.id);
    default:
      return cards;
  }
};

interface Props {
  offers: Array<OfferInterface>;
  type: string;
  sortType: string;
  onFavoriteClick: () => void;
}

const CardList: React.FunctionComponent<Props> = ({offers, type, sortType, onFavoriteClick}: Props) =>
  <div className={`places__list ${getCardListTypeClass(type)}`}>
    {sortCards(offers, sortType).map((offer) =>
      <Card
        cardType={type}
        key={offer.id}
        offer={offer}
        onFavoriteClick={onFavoriteClick}
      />)}
  </div>;

const mapStateToProps = (state) => ({
  sortType: getActiveSort(state)
});

export default connect(mapStateToProps)(CardList);
