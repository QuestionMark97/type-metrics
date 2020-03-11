import * as types from '../constants/actionTypes';
import { WPM, levenshtein } from '../helpers/helpers';

const initialState = {
  WPM: undefined,
  MSDER: undefined
};

function metricsReducer(state = initialState, action) {
  const { text, input, time } = action.payload;

  switch (action.type) {
    case types.RECALC_WPM:
      return { ...state, ...{ WPM: WPM(text, time) } };
    case types.RECALC_MSDER:
      return { ...state, ...{ MSDER: levenshtein(text, input) } };
    default:
      return state;
  }
}

export default metricsReducer;
