// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import { put, takeLatest, all } from 'redux-saga/effects';
import { GET_MARKOV_CHAIN } from '../constants/actionTypes';
import { markovReceived } from '../actions/textActions';

function* fetchMarkov() {
  const json = yield fetch('/api/markov-chain-object')
    .then((res) => res.json())
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err));
  yield put(markovReceived(json));
}

function* markovWatcher() {
  yield takeLatest(GET_MARKOV_CHAIN, fetchMarkov);
}

export default function* rootSaga() {
  yield all([markovWatcher()]);
}
