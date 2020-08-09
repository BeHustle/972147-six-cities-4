import MockAdapter from 'axios-mock-adapter';
import * as React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createAPI} from '../../api/api';
import {AppStatus, AuthStatus, CardType} from '../../constants';
import {setActiveCity, setAppStatus} from '../../reducer/app/app.reducer';
import {getActiveOfferId} from '../../reducer/app/app.selectors';
import {setCities, setNearbyOffers, setOffers, setReviews} from '../../reducer/data/data.reducer';
import reducer from '../../reducer/reducer';
import {setAuthStatus, setUserInfo} from '../../reducer/user/user.reducer';
import {cities} from '../../test-mocks/cities';
import {reviews, serverReviews} from '../../test-mocks/reviews';
import {serverUserInfo, userInfo} from '../../test-mocks/user';
import Card from './card';
import {offers, serverOffers} from '../../test-mocks/offers';

Enzyme.configure({
  adapter: new Adapter(),
});

const api = createAPI();
const apiMock = new MockAdapter(api);

apiMock
  .onGet(`/hotels`)
  .reply(200, serverOffers);

apiMock
  .onGet(`/comments/1`)
  .reply(200, serverReviews);

apiMock
  .onGet(`/hotels/1/nearby`)
  .reply(200, serverOffers);

apiMock
  .onGet(`/login`)
  .reply(200, serverUserInfo);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(setOffers(offers));
store.dispatch(setReviews(reviews));
store.dispatch(setNearbyOffers(offers));
store.dispatch(setCities(cities));
store.dispatch(setActiveCity(cities[0]));
store.dispatch(setAppStatus(AppStatus.SUCCESS_LOAD));
store.dispatch(setUserInfo(userInfo));
store.dispatch(setAuthStatus(AuthStatus.AUTH));

describe(`Card`, () => {

  it(`Title link should be clicked`, () => {
    const onTitleClick = jest.fn();
    const card = mount(<Provider store={store}>
      <Card
        offer={offers[0]}
        onCardHover={() => {}}
        onTitleClick={onTitleClick}
        onFavoriteClick={() => {}}
        cardType={CardType.MAIN}
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
        onFavoriteClick={() => {}}
        cardType={CardType.MAIN}
      />
    </Provider>);
    const cardElement = card.find(`.place-card`);
    cardElement.simulate(`mouseEnter`);
    expect(getActiveOfferId(store.getState())).toEqual(offer.id);
  });

  it(`On mouse leave onCardHover should be called with offer null`, () => {
    const offer = offers[0];
    const card = mount(<Provider store={store}>
      <Card
        offer={offer}
        onTitleClick={() => {}}
        onFavoriteClick={() => {}}
        cardType={CardType.MAIN}
      />
    </Provider>);
    const cardElement = card.find(`.place-card`);
    cardElement.simulate(`mouseEnter`);
    cardElement.simulate(`mouseLeave`);

    expect(getActiveOfferId(store.getState())).toEqual(null);
  });

  it(`onFavoriteClick should be called on favorite btn click`, () => {
    const onFavoriteClick = jest.fn();
    const offer = offers[0];
    const preventDefault = jest.fn();
    const card = mount(<Provider store={store}>
      <Card
        offer={offer}
        onTitleClick={() => {}}
        onFavoriteClick={onFavoriteClick}
        cardType={CardType.MAIN}
      />
    </Provider>);
    const favoriteBtn = card.find(`.place-card__bookmark-button`).first();
    favoriteBtn.simulate(`click`, {preventDefault});
    expect(onFavoriteClick).toBeCalled();
  });
});

