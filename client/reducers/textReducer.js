import * as types from '../constants/actionTypes';

const initialState = {
  text: 'library libe emblige debted nobody puble noblight rob hably nobodys reby labour oblige unbened debts lable but embarn',
  position: 0,
  errors: {}
};

function textReducer(state = initialState, action) {
  let { position } = state;
  let { errors } = state;

  switch (action.type) {
    case types.ADD_ERROR:
      errors[position] = true;
      return { ...state, ...{ errors } };

    case types.UPDATE_POSITION:
      position += action.payload;
      if (action.payload - 1) delete errors[position];
      return { ...state, ...{ position } };

    case types.RESET_TEXT:
      position = 0;
      errors = {};
      return { ...state, ... { position }, ... { errors } };

    case types.GET_MARKOV_CHAIN:
      return state;

    case types.MARKOV_RECEIVED:
      console.log(action.payload);
      return state;

    default:
      return state;
  }
}

export default textReducer;
