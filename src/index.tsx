import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app/app';
import {createAPI} from './api/api';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from './reducer/reducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {Operation as DataOperation} from './reducer/data/data.reducer';
import {Operation as UserOperation} from './reducer/user/user.reducer';

const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(UserOperation.checkAuth());
store.dispatch(DataOperation.loadData());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
