import {combineReducers} from 'redux';
import {Namespace} from './namespace.js';
import {reducer as app} from './app/app.reducer.js';
import {reducer as data} from './data/data.reducer.js';
import {reducer as user} from './user/user.reducer.js';

export default combineReducers({
  [Namespace.APP]: app,
  [Namespace.DATA]: data,
  [Namespace.USER]: user
});
