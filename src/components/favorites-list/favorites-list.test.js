import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createAPI} from '../../api/api.js';
import reducer from '../../reducer/reducer.js';
import {cities} from '../../test-mocks/cities.js';
import {offers} from '../../test-mocks/offers.js';
import FavoritesList from './favorites-list.jsx';

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
        <Provider store={store}>
          <FavoritesList
            offers={offers}
            cities={cities}
            onFavoriteClick={() => {}}
            onCardTitleClick={() => {}}/>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
