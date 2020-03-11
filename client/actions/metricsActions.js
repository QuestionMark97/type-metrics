import * as types from '../constants/actionTypes';

export function recalcWPM(text, time) {
  return {
    type: types.RECALC_WPM,
    payload: { text, time }
  };
}

export function recalcMSDER(str1, str2) {
  return {
    type: types.RECALC_MSDER,
    payload: { str1, str2 }
  };
}
