import React from 'react';
import ReactDOM from 'react-dom';
import {email} from './test-mocks/user.js';
import App from './components/app/app.jsx';
import {createAPI} from './api/api.js';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from './reducer/reducer.js';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {Operation as DataOperation} from './reducer/data/data.reducer.js';
import {setUserEmail} from './reducer/user/user.reducer.js';

const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadData());
store.dispatch(setUserEmail(email));

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
