import { deepClone, mixColors } from '../helpers/applicationHelpers';
import * as types from '../constants/actionTypes';
import { getKeySpeeds, getKeyAccuracies } from '../helpers/reducerHelpers';

const KEYSPEED = 200;
const KEYACC = 1;
const none = 'transparent';
const bkrnd = '#f8f8f8';
const chr = '#666';
const initialState = new function initialState() {
  this.keySpeeds = {};
  this.keyAcc = {};
  this.defaultColors = {
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
  };
  this.keyColors = { ...this.defaultColors };
  this.popups = {};
}();

function keyboardReducer(parentState = {}, state = initialState, action = {}) {
  const keyColors = deepClone(state.keyColors);

  switch (action.subtype) {
    case types.UNLOCK_CHARS: {
      const defaultColors = deepClone(state.defaultColors);
      const unlock = parentState.textGenerator.getChars().reduce((tot, char) => {
        const cpm = state.keySpeeds[char] ? state.keySpeeds[char].cpm : 0;
        const avgErr = state.keyAcc[char] ? state.keyAcc[char].avgErr : 0;
        return tot && (cpm >= KEYSPEED) && (avgErr <= KEYACC);
      }, true);
      if (unlock) parentState.textGenerator.addChars();
      parentState.textGenerator.getChars().forEach((char) => {
        if (defaultColors[char].char === none) {
          defaultColors[char] = { char: bkrnd, key: chr };
          keyColors[char] = { char: bkrnd, key: chr };
        }
      });
      return { ...state, keyColors, defaultColors };
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
      const defaultColors = deepClone(state.defaultColors);
      const char = action.payload;
      if (keyColors[char]) {
        const { char: charColor, key } = defaultColors[char];
        keyColors[char].char = charColor;
        keyColors[char].key = key;
      }
      return { ...state, keyColors };
    }

    case types.RECALC_KEY_ACC: {
      const [charTimes, charErrors, defaultColors] = deepClone(
        parentState.charTimes, parentState.charErrors, state.defaultColors
      );
      const popups = {};
      const [green, yellow, red] = ['#2ecc71', '#f1c40f', '#e74c3c'];
      const keyAcc = getKeyAccuracies(charErrors, parentState.textGenerator.getChars());
      Object.keys(charTimes).concat(' ').forEach((char) => {
        const { avgErr, colorRelErr: relErr } = keyAcc[char] || { avgErr: 0, colorRelErr: 0 };
        const color = (avgErr === 0) ? green : mixColors(yellow, red, 1 - relErr, relErr);
        defaultColors[char] = { char: color, key: bkrnd };
        keyColors[char] = { char: color, key: bkrnd };
        popups[char] = true;
      });
      return {
        ...state, keyAcc, keyColors, defaultColors, popups
      };
    }

    case types.RECALC_SPEED: {
      const [charTimes, defaultColors] = deepClone(parentState.charTimes, state.defaultColors);
      const popups = {};
      const keySpeeds = getKeySpeeds(charTimes);
      Object.entries(keySpeeds).forEach(([char, data]) => {
        const speed = data.relSpeed;
        const opaqueColor = defaultColors[char].char.slice(0, 7);
        const color = opaqueColor + parseFloat(((255 * (1 + speed)) / 2).toFixed()).toString(16);
        defaultColors[char] = { char: color, key: bkrnd };
        keyColors[char] = { char: color, key: bkrnd };
        popups[char] = true;
      });
      return {
        ...state, keySpeeds, keyColors, defaultColors, popups
      };
    }

    default: {
      return state;
    }
  }
}

export default keyboardReducer;
