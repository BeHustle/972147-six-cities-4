import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {CardType} from '../../constants';
import Card from './card';
import {offers} from '../../test-mocks/offers';
import {Router} from 'react-router-dom';
import {history} from '../../history';

configure({adapter: new Adapter()});

describe(`Card`, () => {
  it(`Should call onCardHover with offer id or null on mouse enter and live`, () => {
    const offer = offers[0];
    const onCardHover = jest.fn();
    const card = mount(
        <Router history={history}>
          <Card
            onCardHover={onCardHover}
            offer={offer}
            onFavoriteClick={jest.fn()}
            cardType={CardType.MAIN}/>
        </Router>
    );
    const cardElement = card.find(`.place-card`);
    cardElement.simulate(`mouseEnter`);
    cardElement.simulate(`mouseLeave`);

    expect(onCardHover).toBeCalledTimes(2);
    expect(onCardHover).toHaveBeenNthCalledWith(1, offers[0].id);
    expect(onCardHover).toHaveBeenNthCalledWith(2, null);
  });

  it(`onFavoriteClick should be called on favorite btn click`, () => {
    const onFavoriteClick = jest.fn();
    const offer = offers[0];
    const preventDefault = jest.fn();
    const card = mount(
        <Router history={history}>
          <Card
            onCardHover={jest.fn()}
            offer={offer}
            onFavoriteClick={onFavoriteClick}
            cardType={CardType.MAIN}/>
        </Router>
    );
    const favoriteBtn = card.find(`.place-card__bookmark-button`).first();
    favoriteBtn.simulate(`click`, {preventDefault});
    expect(onFavoriteClick).toBeCalled();
  });
});
