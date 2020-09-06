import * as types from '../constants/actionTypes';
import { keyCodeToMatPos, getKeySpeeds } from '../helpers/reducerHelpers';

const [bkrnd, chr] = ['#f8f8f8', '#666'];

const initialState = {
  keyTimes: {},
  keyColors: [
    [
      [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr],
      [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr]
    ],
    [
      [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr],
      [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr]
    ],
    [
      [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr],
      [bkrnd, chr, bkrnd, chr], [bkrnd, chr, bkrnd, chr]
    ],
    [
      [bkrnd, chr, bkrnd, chr]
    ]
  ]
};

function keyboardReducer(parentState = {}, state = initialState, action = {}) {
  const keyColors = [...state.keyColors];
  const [i, j] = keyCodeToMatPos(action.payload);
  const { charTimes } = parentState;

  switch (action.subtype) {
    case types.HIGHLIGHT_KEY:
      if (i >= 0) {
        keyColors[i][j][0] = chr;
        keyColors[i][j][1] = bkrnd;
      }
      return { ...state, ...{ keyColors } };

    case types.UNHIGHLIGHT_KEY:
      if (i >= 0) {
        keyColors[i][j][0] = keyColors[i][j][2]
        keyColors[i][j][1] = keyColors[i][j][3]
      }
      return { ...state, ...{ keyColors } };

    case types.RECALC_SPEED:
        const blue = '#3498db';
        const keySpeeds = getKeySpeeds(charTimes);
        for (let char in keySpeeds) {
          const [i, j] = keyCodeToMatPos(char)
          const speed = keySpeeds[char].relSpeed;
          const addon = 255 * (1 + speed) / 2;
          const color = blue + parseFloat((255 * (1 + speed) / 2).toFixed()).toString(16);
          keyColors[i][j] = [color, bkrnd, color, bkrnd];
        }
      return { ...state, ...{ keyTimes: keySpeeds } };

    default:
      return state;
  }
}

export default keyboardReducer;
