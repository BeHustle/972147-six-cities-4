import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createAPI} from '../../api/api.js';
import {AuthStatus} from '../../constants.js';
import reducer from '../../reducer/reducer.js';
import {setAuthStatus, setUserInfo} from '../../reducer/user/user.reducer.js';
import {cities} from '../../test-mocks/cities.js';
import {offers} from '../../test-mocks/offers.js';
import {userInfo} from '../../test-mocks/user.js';
import {Favorites} from './favorites.jsx';
import {Router} from 'react-router-dom';
import {history} from '../../history.js';

const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(setUserInfo(userInfo));
store.dispatch(setAuthStatus(AuthStatus.AUTH));

it(`Render favorites`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <Favorites
              cities={cities}
              offers={offers}
              onFavoriteClick={() => {}}
              onFavoritesDidMount={() => {}}
              onCardTitleClick={() => {}}
            />
          </Provider>
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
