import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers/index';
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, composeWithDevTools(), applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
