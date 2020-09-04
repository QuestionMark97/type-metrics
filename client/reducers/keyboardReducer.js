import * as types from '../constants/actionTypes';
import { keyCodeToMatPos } from '../helpers/reducerHelpers';

const [bkrnd, clr] = ['#f8f8f8', '#666'];

const initialState = {
  confidence: {},
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
      keyColors[i][j] = [clr, bkrnd];
      return { ...state, ...{ keyColors } };

    case types.UNHIGHLIGHT_KEY:
      keyColors[i][j] = [bkrnd, clr];
      return { ...state, ...{ keyColors } };

    case types.RECALC_CONF:
      const confidence = {};
      let globalSum = 0;
      let globalLen = 0;
      for (let char in charTimes) {
        const localSum = charTimes[char].reduce((acc, val) => acc + val)
        const localLen = charTimes[char].length;
        const mean = localSum / localLen;
        globalSum += localSum;
        globalLen += localLen;
        confidence[char] = mean;
      }
      for (let char in charTimes) {
        confidence[char] = (globalSum / (globalLen * confidence[char])).toFixed(2);
      }
      console.log(confidence);
      return { ...state, ...{ confidence } };

    default:
      return state;
  }
}

export default keyboardReducer;
