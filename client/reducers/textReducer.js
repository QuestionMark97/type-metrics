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
  charTimes: {  }
};

function textReducer(state = initialState, action) {
  const WORD_COUNT = 5;
  let { text, position, errors, textGenerator, latestTime } = state;

  switch (action.type) {
    case types.MARKOV_RECEIVED:
      textGenerator = new TextGenerator(action.payload, { prob: 0.8, min: 3, max: 7 });
      textGenerator.setChars('enitrlsauodychgmpbkvwfzxqj');
      textGenerator.addChars(5);
      text = textGenerator.generateSentence(WORD_COUNT);
      return { ...state, ...{ textGenerator, text } };

    case types.SET_TIME:
      const date = new Date();
      return { ...state, ...{ startTime: date, latestTime: date } };

    case types.ADD_ERROR:
      errors[position] = true;
      return { ...state, ...{ errors } };

    case types.UPDATE_POSITION:
      const { charTimes } = state;
      const char = text[position];
      if (action.payload - 1) delete errors[position + 1];
      else if (position !== 0 && char !== ' ') {
        if (!charTimes[char]) charTimes[char] = [new Date() - latestTime];
        else charTimes[char].push(new Date() - latestTime);
      }
      position += action.payload;
      latestTime = new Date();
      return { ...state, ...{ position, latestTime } };

    case types.RESET_TEXT:
      text = textGenerator.generateSentence(WORD_COUNT);
      position = 0;
      errors = {};
      // Get avg times for each character
      const obj = {};
      for (let char in state.charTimes) {
        const mean = state.charTimes[char].reduce((acc, val) => acc + val) / state.charTimes[char].length;
        obj[char] = `${mean.toFixed()} ms`;
      }
      console.log(obj);
      return { ...state, ...{ text, position, errors } };

    case types.RECALC_WPM:
      const time = new Date() - state.startTime;
      const wpm = ((text.split(' ').length / time) * 60000).toFixed(2);
      return { ...state, ...{ wpm } };

    case types.RECALC_ERR:
      return { ...state, ...{ errCount: Object.keys(errors).length } };

    default:
      return state;
  }
}

export default textReducer;
