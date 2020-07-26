import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {CARD_TYPE} from '../../constants.js';
import {reducer} from '../../reducer/reducer.js';
import Card from './card.jsx';
import {offers} from '../../mocks/offers.js';

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Card`, () => {
  let store;
  beforeEach(() => {
    store = createStore(reducer);
  });

  it(`Title link should be clicked`, () => {
    const onTitleClick = jest.fn();
    const card = mount(<Provider store={store}>
      <Card
        offer={offers[0]}
        onCardHover={() => {}}
        onTitleClick={onTitleClick}
        cardType={CARD_TYPE.MAIN}
      />
    </Provider>);
    const titleLink = card.find(`.place-card__name a`);
    titleLink.simulate(`click`);

    expect(onTitleClick).toBeCalled();
  });

  it(`On mouse enter onCardHover should be called with offer id`, () => {
    const offer = offers[0];
    const card = mount(<Provider store={store}>
      <Card
        offer={offer}
        onTitleClick={() => {}}
        cardType={CARD_TYPE.MAIN}
      />
    </Provider>);
    const cardElement = card.find(`.place-card`);
    cardElement.simulate(`mouseEnter`);
    expect(store.getState().activeOfferId).toEqual(offer.id);
  });

  it(`On mouse leave onCardHover should be called with offer null`, () => {
    const offer = offers[0];
    const card = mount(<Provider store={store}>
      <Card
        offer={offer}
        onTitleClick={() => {}}
        cardType={CARD_TYPE.MAIN}
      />
    </Provider>);
    const cardElement = card.find(`.place-card`);
    cardElement.simulate(`mouseEnter`);
    cardElement.simulate(`mouseLeave`);

    expect(store.getState().activeOfferId).toEqual(null);
  });
});

