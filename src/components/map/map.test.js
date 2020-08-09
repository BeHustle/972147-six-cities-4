import MockAdapter from 'axios-mock-adapter';
import * as React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createAPI} from '../../api/api';
import {AppStatus, AuthStatus, CardType} from '../../constants';
import {setActiveCity, setAppStatus} from '../../reducer/app/app.reducer';
import {setCities, setNearbyOffers, setOffers, setReviews} from '../../reducer/data/data.reducer';
import reducer from '../../reducer/reducer';
import {setAuthStatus, setUserInfo} from '../../reducer/user/user.reducer';
import {reviews, serverReviews} from '../../test-mocks/reviews';
import Map from './map.tsx';
import {cities} from '../../test-mocks/cities';
import {offers, serverOffers} from '../../test-mocks/offers';
import {serverUserInfo, userInfo} from '../../test-mocks/user';

jest.mock(`../map/mapx`, () => `map`);

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

it(`Render Map`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <Map
            type={CardType.MAIN}
            offers={offers}
            coordinates={cities[0].coordinates}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
