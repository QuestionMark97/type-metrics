import * as types from '../constants/actionTypes';
import { keyCodeToMatPos, getKeySpeeds } from '../helpers/reducerHelpers';

const [bkrnd, clr] = ['#f8f8f8', '#666'];

const initialState = {
  keyTimes: {},
  keyColors: [
    [
      [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr],
      [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr]
    ],
    [
      [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr],
      [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr]
    ],
    [
      [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr],
      [bkrnd, clr], [bkrnd, clr]
    ],
    [
      [bkrnd, clr]
    ]
  ]
};

function keyboardReducer(parentState = {}, state = initialState, action = {}) {
  const keyColors = [...state.keyColors];
  const [i, j] = keyCodeToMatPos(action.payload);
  const { charTimes } = parentState;

  switch (action.subtype) {
    case types.HIGHLIGHT_KEY:
      if (i >= 0) keyColors[i][j] = [clr, bkrnd];
      return { ...state, ...{ keyColors } };

    case types.UNHIGHLIGHT_KEY:
      if (i >= 0) keyColors[i][j] = [bkrnd, clr];
      return { ...state, ...{ keyColors } };

    case types.RECALC_CONF:
      return { ...state, ...{ keyTimes: getKeySpeeds(charTimes) } };

    default:
      return state;
  }
}

export default keyboardReducer;
