import * as React from 'react';
import {Provider} from 'react-redux';
import * as renderer from 'react-test-renderer';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createAPI} from '../../api/api';
import reducer from '../../reducer/reducer';
import {cities} from '../../test-mocks/cities';
import {offers} from '../../test-mocks/offers';
import FavoritesList from './favorites-list';
import {Router} from 'react-router-dom';
import {history} from '../../history';

const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

it(`Render empty favorites list`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <FavoritesList
              offers={offers}
              cities={cities}
              onFavoriteClick={jest.fn()}/>
          </Provider>
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
