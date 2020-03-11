import { combineReducers } from 'redux';
import textReducer from './textReducer';
import metricsReducer from './metricsReducer';

const reducers = combineReducers({
  text: textReducer,
  metrics: metricsReducer
});

export default reducers;
