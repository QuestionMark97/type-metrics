import * as types from '../constants/actionTypes';

export function highlightKey(keyCode) {
  return {
    type: types.KEYBOARD,
    subtype: types.HIGHLIGHT_KEY,
    payload: keyCode
  };
}

export function unhighlightKey(keyCode) {
  return {
    type: types.KEYBOARD,
    subtype: types.UNHIGHLIGHT_KEY,
    payload: keyCode
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

export function unlockChar(char) {
  return {
    type: types.KEYBOARD,
    subtype: types.UNLOCK_CHARS,
    payload: char
  };
}
