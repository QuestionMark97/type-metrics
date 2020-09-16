import keyboardReducer from './keyboardReducer';
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
  latestTime: 0,
  charTimes: {},
  keyboard: keyboardReducer()
};

function textReducer(state = initialState, action) {
  let { text, position, errors, textGenerator, latestTime, charTimes } = state;
  const TEXT_OPTIONS = { prob: 0.8, min: 3, max: 7 };
  const CHAR_ORDER = 'enitrlsauodychgmpbkvwfzxqj';
  const INITIAL_CHARS = 5;
  const WORD_COUNT = 5;
  const HISTORY = 3;

  switch (action.type) {
    case types.MARKOV_RECEIVED:
      textGenerator = new TextGenerator(action.payload, TEXT_OPTIONS);
      textGenerator.setChars(CHAR_ORDER);
      textGenerator.addChars(INITIAL_CHARS);
      text = textGenerator.generateSentence(WORD_COUNT);
      return { ...state, textGenerator, text, keyboard: keyboardReducer({ charTimes, textGenerator }, state.keyboard, action) };

    case types.SET_TIME:
      const date = new Date();
      for (let char in charTimes) {
        if (charTimes[char].length >= HISTORY) charTimes[char].shift();
        charTimes[char].push([]);
      }
      return { ...state, startTime: date, latestTime: date };

    case types.ADD_ERROR:
      errors[position] = true;
      return { ...state, errors };

    case types.UPDATE_POSITION:
      const char = text[position];
      if (action.payload - 1) delete errors[position - 1];
      else if (position !== 0 && char !== ' ') {
        if (!charTimes[char]) charTimes[char] = [[new Date() - latestTime]];
        else charTimes[char][charTimes[char].length - 1].push(new Date() - latestTime);
      }
      position += action.payload;
      latestTime = new Date();
      return { ...state, position, latestTime };

    case types.RESET_TEXT:
      text = textGenerator.generateSentence(WORD_COUNT);
      return { ...state, text, position: 0, errors: {} };

    case types.RECALC_WPM:
      const time = new Date() - state.startTime;
      const wpm = ((text.split(' ').length / time) * 60000).toFixed(2);
      return { ...state, wpm };

    case types.RECALC_ERR:
      return { ...state, errCount: Object.keys(errors).length };

    case types.KEYBOARD:
      return { ...state, keyboard: keyboardReducer(state, state.keyboard, action) };

    default:
      return state;
  }
}

export default textReducer;
