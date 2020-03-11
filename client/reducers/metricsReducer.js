import * as types from '../constants/actionTypes';
import { WPM, levenshtein } from '../helpers/reducerHelpers';

const initialState = {
  WPM: undefined,
  MSD: undefined
};

function metricsReducer(state = initialState, action) {
  let text; let time; let input;

  switch (action.type) {
    case types.RECALC_WPM:
      text = action.payload.text;
      time = action.payload.time;
      return { ...state, ...{ WPM: WPM(text, time) } };
    case types.RECALC_MSD:
      text = action.payload.text;
      input = action.payload.input;
      return { ...state, ...{ MSD: levenshtein(text, input) } };
    default:
      return state;
  }
}

export default metricsReducer;
