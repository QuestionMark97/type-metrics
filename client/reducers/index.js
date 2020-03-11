import { combineReducers } from 'redux';
import textReducer from './textReducer';

const reducers = combineReducers({
  text: textReducer
});

export default reducers;
