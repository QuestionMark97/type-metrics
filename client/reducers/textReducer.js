import * as types from '../constants/actionTypes';
import TextGenerator from '../classes/TextGenerator';

const initialState = {
  textGenerator: {},
  text: '',
  position: 0,
  errors: {}
};

function textReducer(state = initialState, action) {
  let { text, position, errors } = state;

  switch (action.type) {
    case types.ADD_ERROR:
      errors[position] = true;
      return { ...state, ...{ errors } };

    case types.UPDATE_POSITION:
      position += action.payload;
      if (action.payload - 1) delete errors[position];
      return { ...state, ...{ position } };

    case types.RESET_TEXT:
      text = state.textGenerator.generateSentence(70);
      position = 0;
      errors = {};
      return { ...state, ...{ text }, ...{ position }, ...{ errors } };

    case types.MARKOV_RECEIVED:
      const textGenerator = new TextGenerator(action.payload, {
        prob: 0.8,
        min: 3,
        max: 7
      });
      textGenerator.setChars('enitrlsauodychgmpbkvwfzxqj');
      textGenerator.addChars(5);
      text = textGenerator.generateSentence(70);
      return { ...state, ...{ textGenerator }, ...{ text } };

    default:
      return state;
  }
}

export default textReducer;
