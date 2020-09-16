import * as types from '../constants/actionTypes';

export function setTime() {
  return { type: types.SET_TIME };
}

export function getMarkovChain() {
  return { type: types.GET_MARKOV_CHAIN };
}

export function markovReceived(json) {
  return {
    type: types.MARKOV_RECEIVED,
    subtype: types.UNLOCK_CHARS,
    payload: json
  };
}

export function addError() {
  return { type: types.ADD_ERROR };
}

export function updatePosition(increment) {
  return {
    type: types.UPDATE_POSITION,
    payload: increment
  };
}

export function resetText() {
  return { type: types.RESET_TEXT };
}

export function recalcWpm() {
  return { type: types.RECALC_WPM };
}

export function recalcErr() {
  return { type: types.RECALC_ERR };
}
