import { combineReducers } from 'redux';
import textReducer from './textReducer';
import metricsReducer from './metricsReducer';
import keyboardReducer from './keyboardReducer';

const reducers = combineReducers({
  text: textReducer,
  metrics: metricsReducer,
  keyboard: keyboardReducer
});

export default reducers;
