import MockAdapter from 'axios-mock-adapter';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createAPI} from '../../api/api';
import {AppStatus, AuthStatus, Sorts} from '../../constants';
import {setActiveCity, setAppStatus} from '../../reducer/app/app.reducer';
import {getActiveSort} from '../../reducer/app/app.selectors';
import {setCities, setNearbyOffers, setOffers, setReviews} from '../../reducer/data/data.reducer';
import reducer from '../../reducer/reducer';
import {setAuthStatus, setUserInfo} from '../../reducer/user/user.reducer';
import {cities} from '../../test-mocks/cities';
import {offers, serverOffers} from '../../test-mocks/offers';
import {reviews, serverReviews} from '../../test-mocks/reviews';
import {serverUserInfo, userInfo} from '../../test-mocks/user';
import SortList from './sort-list.tsx';

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
        applyMiddleware(thunk.withExtraArgument(api)),
    ),
);

store.dispatch(setOffers(offers));
store.dispatch(setReviews(reviews));
store.dispatch(setNearbyOffers(offers));
store.dispatch(setCities(cities));
store.dispatch(setActiveCity(cities[0]));
store.dispatch(setAppStatus(AppStatus.SUCCESS_LOAD));
store.dispatch(setUserInfo(userInfo));
store.dispatch(setAuthStatus(AuthStatus.AUTH));

it(`Active sort should be changed to clicked sort`, () => {
  const sortListWithProvider = mount(
      <Provider store={store}>
        <SortList />
      </Provider>
  );
  const sortLink = sortListWithProvider.find(`.places__option`).last();
  sortLink.simulate(`click`);

  expect(getActiveSort(store.getState())).toEqual(Sorts[sortLink.key()]);
});
