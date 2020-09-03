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

export function recalcWpm(text, time) {
  return {
    type: types.RECALC_WPM,
    payload: { text, time }
  };
}

export function recalcErr(str1, str2) {
  return {
    type: types.RECALC_ERR,
    payload: { str1, str2 }
  };
}

export function updateInput(increment, char) {
  return {
    type: types.UPDATE_INPUT,
    payload: { increment, char }
  };
}
