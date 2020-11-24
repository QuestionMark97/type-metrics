import * as types from '../constants/actionTypes';

export function highlightKey(char) {
  return {
    type: types.KEYBOARD,
    subtype: types.HIGHLIGHT_KEY,
    payload: char
  };
}

export function unhighlightKey(char) {
  return {
    type: types.KEYBOARD,
    subtype: types.UNHIGHLIGHT_KEY,
    payload: char
  };
}

export function recalcSpeed() {
  return {
    type: types.KEYBOARD,
    subtype: types.RECALC_SPEED
  };
}

export function recalcKeyAcc() {
  return {
    type: types.KEYBOARD,
    subtype: types.RECALC_KEY_ACC
  };
}

export function unlockChar() {
  return {
    type: types.KEYBOARD,
    subtype: types.UNLOCK_CHARS
  };
}
