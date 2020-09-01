import regeneratorRuntime from 'regenerator-runtime';
import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchMarkov() {
  const json = yield fetch('/api/markov-chain-object')
    .then((res) => res.json())
    .catch((err) => console.log(err));
  yield put({ type: 'MARKOV_RECEIVED', payload: json });
}

function* markovWatcher() {
  yield takeLatest('GET_MARKOV_CHAIN', fetchMarkov);
}

export default function* rootSaga() {
  yield all([markovWatcher()]);
}
