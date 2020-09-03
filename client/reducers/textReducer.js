import * as types from '../constants/actionTypes';
import TextGenerator from '../classes/TextGenerator';
import { WPM } from '../helpers/reducerHelpers';

const initialState = {
  textGenerator: {},
  text: '',
  position: 0,
  errors: {},
  wpm: '--',
  errCount: '--',
  startTime: 0,
  input: ''
};

function textReducer(state = initialState, action) {
  const WORD_COUNT = 5;
  let { text, position, errors } = state;
  let time; let input; let wpm;

  switch (action.type) {
    case types.MARKOV_RECEIVED:
      const textGenerator = new TextGenerator(action.payload, { prob: 0.8, min: 3, max: 7 });
      textGenerator.setChars('enitrlsauodychgmpbkvwfzxqj');
      textGenerator.addChars(5);
      text = textGenerator.generateSentence(WORD_COUNT);
      return { ...state, ...{ textGenerator }, ...{ text } };

    case types.SET_TIME:
      return { ...state, ...{ startTime: new Date() } };

    case types.ADD_ERROR:
      errors[position] = true;
      return { ...state, ...{ errors } };

    case types.UPDATE_POSITION:
      position += action.payload;
      if (action.payload - 1) delete errors[position];
      return { ...state, ...{ position } };

    case types.RESET_TEXT:
      text = state.textGenerator.generateSentence(WORD_COUNT);
      position = 0;
      errors = {};
      return { ...state, ...{ text }, ...{ position }, ...{ errors } };

    case types.RECALC_WPM:
      time = action.payload.time;
      wpm = ((text.split(' ').length / time) * 60000).toFixed(2);
      return { ...state, ...{ wpm } };

    case types.RECALC_ERR:
      input = action.payload.str2;
      return { ...state, ...{ errCount: Object.keys(errors).length } };

    case types.UPDATE_INPUT:
      if (action.payload.increment - 1) input = state.input.slice(0, state.input.length - 1);
      else input = state.input + action.payload.char;
      return { ...state, ...{ input } };

    default:
      return state;
  }
}

export default textReducer;
