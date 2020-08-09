import * as React from 'react';
import {Provider} from 'react-redux';
import * as renderer from 'react-test-renderer';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createAPI} from '../../api/api';
import {AuthStatus} from '../../constants';
import reducer from '../../reducer/reducer';
import {setAuthStatus, setUserInfo} from '../../reducer/user/user.reducer';
import {cities} from '../../test-mocks/cities';
import {offers} from '../../test-mocks/offers';
import {userInfo} from '../../test-mocks/user';
import {Favorites} from './favorites';
import {Router} from 'react-router-dom';
import {history} from '../../history';

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
