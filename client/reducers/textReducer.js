import * as types from '../constants/actionTypes';

const initialState = {
  position: 0,
  errors: {}
};

function textReducer(state = initialState, action) {
  let { position } = state;
  const { errors } = state;

  switch (action.type) {
    case types.ADD_ERROR:
      errors[position] = true;
      return { ...state, ...{ errors } };
    case types.UPDATE_POSITION:
      position += action.payload;
      if (action.payload - 1) delete errors[position];
      return { ...state, ...{ position } };
    default:
      return state;
  }
}

export default textReducer;
