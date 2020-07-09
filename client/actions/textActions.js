import * as types from '../constants/actionTypes';

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
