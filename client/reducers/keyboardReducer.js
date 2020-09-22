import { deepClone, mixColors } from '../helpers/applicationHelpers';
import * as types from '../constants/actionTypes';
import { getKeySpeeds, getKeyAccuracies } from '../helpers/reducerHelpers';

const none = 'transparent';
const bkrnd = '#f8f8f8';
const chr = '#666';
const popup = false;
const initialState = {
  keySpeeds: {},
  keyAcc: {},
  keyColors: {
    q: { char: none, key: none, popup: false },
    w: { char: none, key: none, popup: false },
    e: { char: none, key: none, popup: false },
    r: { char: none, key: none, popup: false },
    t: { char: none, key: none, popup: false },
    y: { char: none, key: none, popup: false },
    u: { char: none, key: none, popup: false },
    i: { char: none, key: none, popup: false },
    o: { char: none, key: none, popup: false },
    p: { char: none, key: none, popup: false },
    a: { char: none, key: none, popup: false },
    s: { char: none, key: none, popup: false },
    d: { char: none, key: none, popup: false },
    f: { char: none, key: none, popup: false },
    g: { char: none, key: none, popup: false },
    h: { char: none, key: none, popup: false },
    j: { char: none, key: none, popup: false },
    k: { char: none, key: none, popup: false },
    l: { char: none, key: none, popup: false },
    z: { char: none, key: none, popup: false },
    x: { char: none, key: none, popup: false },
    c: { char: none, key: none, popup: false },
    v: { char: none, key: none, popup: false },
    b: { char: none, key: none, popup: false },
    n: { char: none, key: none, popup: false },
    m: { char: none, key: none, popup: false },
    ' ': { char: none, key: none, popup: false }
  },
  defKeyColors: {
    q: { char: none, key: none },
    w: { char: none, key: none },
    e: { char: none, key: none },
    r: { char: none, key: none },
    t: { char: none, key: none },
    y: { char: none, key: none },
    u: { char: none, key: none },
    i: { char: none, key: none },
    o: { char: none, key: none },
    p: { char: none, key: none },
    a: { char: none, key: none },
    s: { char: none, key: none },
    d: { char: none, key: none },
    f: { char: none, key: none },
    g: { char: none, key: none },
    h: { char: none, key: none },
    j: { char: none, key: none },
    k: { char: none, key: none },
    l: { char: none, key: none },
    z: { char: none, key: none },
    x: { char: none, key: none },
    c: { char: none, key: none },
    v: { char: none, key: none },
    b: { char: none, key: none },
    n: { char: none, key: none },
    m: { char: none, key: none },
    ' ': { char: none, key: none }
  }
};

function keyboardReducer(parentState = {}, state = initialState, action = {}) {
  const keyColors = deepClone(state.keyColors);

  switch (action.subtype) {
    case types.UNLOCK_CHARS: {
      const defKeyColors = deepClone(state.defKeyColors);
      parentState.textGenerator.getChars().forEach((char) => {
        keyColors[char] = { char: bkrnd, key: chr, popup };
        defKeyColors[char] = { char: bkrnd, key: chr };
      });
      return { ...state, keyColors, defKeyColors };
    }

    case types.HIGHLIGHT_KEY: {
      const char = action.payload;
      if (keyColors[char]) {
        keyColors[char].char = chr;
        keyColors[char].key = bkrnd;
      }
      return { ...state, keyColors };
    }

    case types.UNHIGHLIGHT_KEY: {
      const defKeyColors = deepClone(state.defKeyColors);
      const char = action.payload;
      if (keyColors[char]) {
        const { char: charColor, key } = defKeyColors[char];
        keyColors[char].char = charColor;
        keyColors[char].key = key;
      }
      return { ...state, keyColors };
    }

    case types.RECALC_SPEED: {
      const blue = '#3498db';
      const [charTimes, defKeyColors] = deepClone(parentState.charTimes, state.defKeyColors);
      const keySpeeds = getKeySpeeds(charTimes);
      Object.entries(keySpeeds).forEach(([char, data]) => {
        const speed = data.relSpeed;
        const color = blue + parseFloat(((255 * (1 + speed)) / 2).toFixed()).toString(16);
        keyColors[char] = { char: color, key: bkrnd, popup: true };
        defKeyColors[char] = { char: color, key: bkrnd };
      });
      return { ...state, keySpeeds, defKeyColors };
    }

    case types.RECALC_KEY_ACC: {
      const [charTimes, charErrors, defKeyColors] = deepClone(
        parentState.charTimes, parentState.charErrors, state.defKeyColors
      );
      const [green, yellow, red] = ['#2ecc71', '#f1c40f', '#e74c3c'];
      const keyAcc = getKeyAccuracies(charErrors, parentState.textGenerator.getChars());
      Object.keys(charTimes).concat(' ').forEach((char) => {
        const { avgErr, colorRelErr: relErr } = keyAcc[char] || { avgErr: 0, colorRelErr: 0 };
        const color = (avgErr === 0) ? green : mixColors(yellow, red, 1 - relErr, relErr);
        keyColors[char] = { char: color, key: bkrnd, popup: true };
        defKeyColors[char] = { char: color, key: bkrnd };
      });
      return {
        ...state, keyAcc, keyColors, defKeyColors
      };
    }

    default: {
      return state;
    }
  }
}

export default keyboardReducer;
