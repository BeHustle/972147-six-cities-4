import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createAPI} from '../../api/api.js';
import {AppStatus, CARD_TYPE} from '../../constants.js';
import {setActiveCity, setAppStatus} from '../../reducer/app/app.reducer.js';
import {setCities, setNearbyOffers, setOffers, setReviews} from '../../reducer/data/data.reducer.js';
import reducer from '../../reducer/reducer.js';
import {setUserEmail} from '../../reducer/user/user.reducer.js';
import {reviews, serverReviews} from '../../test-mocks/reviews.js';
import Map from './map.jsx';
import {cities} from '../../test-mocks/cities.js';
import {offers, serverOffers} from '../../test-mocks/offers.js';
import {email} from '../../test-mocks/user.js';

jest.mock(`../map/map.jsx`, () => `map`);

const api = createAPI(() => {
});
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
store.dispatch(setUserEmail(email));

it(`Render Map`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <Map
            type={CARD_TYPE.MAIN}
            offers={offers}
            coordinates={cities[0].coordinates}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
