import { combineReducers } from 'redux';
import textReducer from './textReducer';
import keyboardReducer from './keyboardReducer';

const reducers = combineReducers({
  text: textReducer
});

export default reducers;
