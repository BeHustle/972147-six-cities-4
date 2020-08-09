import {combineReducers} from 'redux';
import {Namespace} from './namespace';
import {reducer as app} from './app/app.reducer';
import {reducer as data} from './data/data.reducer';
import {reducer as user} from './user/user.reducer';

export default combineReducers({
  [Namespace.APP]: app,
  [Namespace.DATA]: data,
  [Namespace.USER]: user
});
