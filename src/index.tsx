import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.js';
import {createAPI} from './api/api.js';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from './reducer/reducer.js';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {Operation as DataOperation} from './reducer/data/data.reducer.js';
import {Operation as UserOperation} from './reducer/user/user.reducer.js';

const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadData());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
