import { deepClone } from '../helpers/applicationHelpers';
import keyboardReducer from './keyboardReducer';
import * as types from '../constants/actionTypes';
import TextGenerator from '../classes/TextGenerator';

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
  charErrors: {},
  keyboard: keyboardReducer()
};

function textReducer(state = initialState, action) {
  const TEXT_OPTIONS = { prob: 0.8, min: 3, max: 7 };
  const CHAR_ORDER = 'enitrlsauodychgmpbkvwfzxqj';
  const INITIAL_CHARS = 5;
  const WORD_COUNT = 5;
  const HISTORY = 3;

  switch (action.type) {
    case types.MARKOV_RECEIVED: {
      const textGenerator = new TextGenerator(action.payload, TEXT_OPTIONS);
      textGenerator.setChars(CHAR_ORDER);
      textGenerator.addChars(INITIAL_CHARS);
      return {
        ...state,
        textGenerator,
        text: textGenerator.generateSentence(WORD_COUNT),
        keyboard: keyboardReducer({
          charTimes: state.charTimes, charErrors: state.charErrors, textGenerator
        }, state.keyboard, action)
      };
    }

    case types.SET_TIME: {
      const date = new Date();
      const charTimes = deepClone(state.charTimes);
      Object.keys(charTimes).forEach((char) => {
        if (charTimes[char].length >= HISTORY) charTimes[char].shift();
        charTimes[char].push([]);
      });
      return { ...state, startTime: date, latestTime: date };
    }

    case types.ADD_ERROR: {
      const [charErrors, errors] = deepClone(state.charErrors, state.errors);
      const char = state.text[state.position];
      errors[state.position] = true;
      if (!charErrors[char]) charErrors[char] = [1];
      else charErrors[char][charErrors[char].length - 1]++;
      return { ...state, errors, charErrors };
    }

    case types.UPDATE_POSITION: {
      const [charTimes, errors] = deepClone(state.charTimes, state.errors);
      let { position, latestTime } = state;
      const char = state.text[state.position];
      if (action.payload - 1) {
        delete errors[position - 1];
      } else if (position !== 0 && char !== ' ') {
        if (!charTimes[char]) charTimes[char] = [[new Date() - latestTime]];
        else charTimes[char][charTimes[char].length - 1].push(new Date() - latestTime);
      }
      position += action.payload;
      latestTime = new Date();
      return {
        ...state, position, errors, latestTime, charTimes
      };
    }

    case types.RESET_TEXT: {
      const charErrors = deepClone(state.charErrors);
      const text = state.textGenerator.generateSentence(WORD_COUNT);
      Object.keys(charErrors).forEach((char) => {
        if (charErrors[char].length >= HISTORY) charErrors[char].shift();
        charErrors[char].push(0);
      });
      return {
        ...state, text, position: 0, errors: {}, charErrors
      };
    }

    case types.RECALC_WPM: {
      const time = new Date() - state.startTime;
      const { text } = state;
      const wpm = ((text.split(' ').length / time) * 60000).toFixed(2);
      return { ...state, wpm };
    }

    case types.RECALC_ERR: {
      const errors = { ...state.errors };
      return { ...state, errCount: Object.keys(errors).length };
    }

    case types.KEYBOARD: {
      return { ...state, keyboard: keyboardReducer(state, state.keyboard, action) };
    }

    default: {
      return state;
    }
  }
}

export default textReducer;
