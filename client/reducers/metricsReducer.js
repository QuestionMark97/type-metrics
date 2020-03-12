import * as types from '../constants/actionTypes';
import { WPM, levenshtein } from '../helpers/reducerHelpers';

const initialState = {
  WPM: undefined,
  MSD: undefined,
  startTime: 0,
  input: ''
};

function metricsReducer(state = initialState, action) {
  let text; let time; let input;

  switch (action.type) {
    case types.RECALC_WPM:
      text = action.payload.text;
      time = action.payload.time;
      return { ...state, ...{ WPM: WPM(text, time) } };

    case types.RECALC_MSD:
      text = action.payload.str1;
      input = action.payload.str2;
      return { ...state, ...{ MSD: levenshtein(text, input) } };

    case types.SET_TIME:
      return { ...state, ...{ startTime: new Date() } };

    case types.UPDATE_INPUT:
      if (action.payload.increment - 1) input = state.input.slice(0, state.input.length - 1);
      else input = state.input + action.payload.char;
      return { ...state, ...{ input } };

    default:
      return state;
  }
}

export default metricsReducer;
