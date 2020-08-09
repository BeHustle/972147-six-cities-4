import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createAPI} from '../../api/api';
import reducer from '../../reducer/reducer';
import {cities} from '../../test-mocks/cities';
import {offers} from '../../test-mocks/offers';
import FavoritesList from './favorites-list.tsx';

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
