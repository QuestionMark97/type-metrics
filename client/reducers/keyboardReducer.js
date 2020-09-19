import { deepClone, mixColors } from '../helpers/applicationHelpers';
import * as types from '../constants/actionTypes';
import { keyCodeToMatPos, getKeySpeeds, getKeyAccuracies } from '../helpers/reducerHelpers';

const key = 'transparent';
const bkrnd = '#f8f8f8';
const chr = '#666';
const popup = false;
const initialState = {
  keyTimes: {},
  keyAcc: {},
  keyColors: [
    [
      [key, key, key, key, popup], [key, key, key, key, popup], [key, key, key, key, popup],
      [key, key, key, key, popup], [key, key, key, key, popup], [key, key, key, key, popup],
      [key, key, key, key, popup], [key, key, key, key, popup], [key, key, key, key, popup],
      [key, key, key, key, popup]
    ],
    [
      [key, key, key, key, popup], [key, key, key, key, popup], [key, key, key, key, popup],
      [key, key, key, key, popup], [key, key, key, key, popup], [key, key, key, key, popup],
      [key, key, key, key, popup], [key, key, key, key, popup], [key, key, key, key, popup]
    ],
    [
      [key, key, key, key, popup], [key, key, key, key, popup], [key, key, key, key, popup],
      [key, key, key, key, popup], [key, key, key, key, popup], [key, key, key, key, popup],
      [key, key, key, key, popup]
    ],
    [
      [bkrnd, chr, bkrnd, chr, popup]
    ]
  ]
};

function keyboardReducer(parentState = {}, state = initialState, action = {}) {
  const { charTimes, textGenerator } = parentState;
  const keyColors = deepClone(state.keyColors);

  switch (action.subtype) {
    case types.UNLOCK_CHARS: {
      textGenerator.getChars().forEach((char) => {
        const [i, j] = keyCodeToMatPos(char);
        keyColors[i][j] = [bkrnd, chr, bkrnd, chr, popup];
      });
      return { ...state, keyColors };
    }

    case types.HIGHLIGHT_KEY: {
      const [i, j] = keyCodeToMatPos(action.payload);
      if (i >= 0) {
        keyColors[i][j][0] = chr;
        keyColors[i][j][1] = bkrnd;
      }
      return { ...state, keyColors };
    }

    case types.UNHIGHLIGHT_KEY: {
      const [i, j] = keyCodeToMatPos(action.payload);
      if (i >= 0) {
        const [,, color, background] = keyColors[i][j];
        keyColors[i][j][0] = color;
        keyColors[i][j][1] = background;
      }
      return { ...state, keyColors };
    }

    case types.RECALC_SPEED: {
      const blue = '#3498db';
      const keySpeeds = getKeySpeeds(charTimes);
      Object.entries(keySpeeds).forEach(([char, data]) => {
        const [i, j] = keyCodeToMatPos(char);
        const speed = data.relSpeed;
        const color = blue + parseFloat(((255 * (1 + speed)) / 2).toFixed()).toString(16);
        keyColors[i][j] = [color, bkrnd, color, bkrnd, true];
      });
      return { ...state, keyTimes: keySpeeds };
    }

    case types.RECALC_KEY_ACC: {
      const charErrors = deepClone(parentState.charErrors);
      const [green, yellow, red] = ['#2ecc71', '#f1c40f', '#e74c3c'];
      const keyAcc = getKeyAccuracies(charErrors, textGenerator.getChars());
      Object.keys(charTimes).concat(' ').forEach((char) => {
        const [i, j] = keyCodeToMatPos(char);
        const { avgErr, colorRelErr: relErr } = keyAcc[char] || { avgErr: 0, colorRelErr: 0 };
        const color = (avgErr === 0) ? green : mixColors(yellow, red, 1 - relErr, relErr);
        keyColors[i][j] = [color, bkrnd, color, bkrnd, true];
      });
      return { ...state, keyAcc, keyColors };
    }

    default: {
      return state;
    }
  }
}

export default keyboardReducer;
