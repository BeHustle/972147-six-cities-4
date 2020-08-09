import MockAdapter from 'axios-mock-adapter';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../api/api';
import {AppStatus, AuthStatus} from '../../constants';
import {setActiveCity, setAppStatus} from '../../reducer/app/app.reducer';
import {setCities, setNearbyOffers, setOffers, setReviews} from '../../reducer/data/data.reducer';
import reducer from '../../reducer/reducer';
import {setAuthStatus, setUserInfo} from '../../reducer/user/user.reducer';
import {reviews, serverReviews} from '../../test-mocks/reviews';
import {cities} from '../../test-mocks/cities';
import {offers, serverOffers} from '../../test-mocks/offers';
import {serverUserInfo, userInfo} from '../../test-mocks/user';
import SingIn from './sign-in';
import {Router} from 'react-router-dom';
import {history} from '../../history';

configure({adapter: new Adapter()});

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
  .onPost(`/login`)
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
store.dispatch(setAuthStatus(AuthStatus.NO_AUTH));

it(`Should form be submitted`, () => {
  const preventDefault = jest.fn();

  const signInWithProvider = mount(<Router history={history}>
    <Provider store={store}>
      <SingIn />
    </Provider>
  </Router>);

  const mockEvent = {
    preventDefault,
  };
  const authForm = signInWithProvider.find(`.login__form`).first();
  authForm.simulate(`submit`, mockEvent);
  expect(preventDefault).toHaveBeenCalled();
});
