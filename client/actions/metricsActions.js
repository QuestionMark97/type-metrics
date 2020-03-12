import * as types from '../constants/actionTypes';

export function recalcWPM(text, time) {
  return {
    type: types.RECALC_WPM,
    payload: { text, time }
  };
}

export function recalcMSD(str1, str2) {
  return {
    type: types.RECALC_MSD,
    payload: { str1, str2 }
  };
}

export function updateInput(increment, char) {
  return {
    type: types.UPDATE_INPUT,
    payload: { increment, char }
  };
}

export function setTime() {
  return { type: types.SET_TIME };
}
