import MockAdapter from 'axios-mock-adapter';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../api/api.js';
import {AppStatus, AuthStatus} from '../../constants.js';
import {setActiveCity, setAppStatus} from '../../reducer/app/app.reducer.js';
import {setCities, setNearbyOffers, setOffers, setReviews} from '../../reducer/data/data.reducer.js';
import reducer from '../../reducer/reducer.js';
import {setAuthStatus, setUserInfo} from '../../reducer/user/user.reducer.js';
import {reviews, serverReviews} from '../../test-mocks/reviews.js';
import {cities} from '../../test-mocks/cities.js';
import {offers, serverOffers} from '../../test-mocks/offers.js';
import {serverUserInfo, userInfo} from '../../test-mocks/user.js';
import AddReview from './add-review.tsx';

jest.mock(`../map/map.jsx`, () => `map`);

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
  .onPost(`/login`)
  .reply(200, serverUserInfo);

apiMock
  .onPost(`/comments/1`)
  .reply(200);

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

  const addReviewWithProvider = mount(<Provider store={store}>
    <AddReview offerId={1}/>
  </Provider>);

  const mockEvent = {
    preventDefault,
  };
  const authForm = addReviewWithProvider.find(`form`);
  authForm.simulate(`submit`, mockEvent);
  expect(preventDefault).toHaveBeenCalled();
});

it(`Should state change on rating change`, () => {
  const addReviewWithProvider = mount(<Provider store={store}>
    <AddReview offerId={1}/>
  </Provider>);

  const addReview = addReviewWithProvider.find(`AddReview`);
  const ratingInput = addReviewWithProvider.find(`.form__rating-input`).first();
  ratingInput.simulate(`change`);
  expect(addReview.state().rating).not.toBeNull();
});

it(`Should state change on rating textarea on TRUE`, () => {
  const addReviewWithProvider = mount(<Provider store={store}>
    <AddReview offerId={1}/>
  </Provider>);

  const addReview = addReviewWithProvider.find(`AddReview`);
  const textArea = addReviewWithProvider.find(`textarea`).first();
  textArea.getDOMNode().value = `new valuenew valuenew valuenew valuenew valuenew valuenew valuenew valuenew value`;
  textArea.simulate(`change`);
  expect(addReview.state().isTextareaCorrect).toBeTruthy();
});

it(`Should state change on rating textarea on FALSE`, () => {
  const addReviewWithProvider = mount(<Provider store={store}>
    <AddReview offerId={1}/>
  </Provider>);

  const addReview = addReviewWithProvider.find(`AddReview`);
  const textArea = addReviewWithProvider.find(`textarea`).first();
  textArea.getDOMNode().value = `new valuenew valuenew valuenew valuenew valuenew valuenew valuenew valuenew value`;
  textArea.simulate(`change`);

  textArea.getDOMNode().value = ``;
  textArea.simulate(`change`);

  expect(addReview.state().isTextareaCorrect).toBeFalsy();
});

