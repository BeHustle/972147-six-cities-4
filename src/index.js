import React from 'react';
import ReactDOM from 'react-dom';
import {email} from './mocks/user.js';
import App from './components/app/app.jsx';
import {createAPI} from './api/api.js';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer, ActionCreator, Operation} from './reducer/reducer.js';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(Operation.loadData());
store.dispatch(ActionCreator.loadUserEmail(email));

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
