import * as types from '../constants/actionTypes';

export function highlightKey(keyCode) {
  return {
    type: types.HIGHLIGHT_KEY,
    payload: keyCode
  };
}

export function unhighlightKey(keyCode) {
  return {
    type: types.UNHIGHLIGHT_KEY,
    payload: keyCode
  };
}
