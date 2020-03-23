import * as types from '../constants/actionTypes';
import { keyCodeToMatPos } from '../helpers/reducerHelpers';

const [bkrnd, clr] = ['#f8f8f8', '#666'];

const initialState = {
  color: [
    [
      [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr],
      [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr]
    ],
    [
      [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr],
      [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr]
    ],
    [
      [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr], [bkrnd, clr],
      [bkrnd, clr], [bkrnd, clr]
    ],
    [
      [bkrnd, clr]
    ]
  ]
};

function keyboardReducer(state = initialState, action) {
  const color = [...state.color];
  const [i, j] = keyCodeToMatPos(action.payload);
  if (!color[i]) return state;
  switch (action.type) {
    case types.HIGHLIGHT_KEY:
      color[i][j] = ['#666', '#f8f8f8'];
      return { color };

    case types.UNHIGHLIGHT_KEY:
      color[i][j] = [bkrnd, clr];
      return { color };

    default:
      return state;
  }
}

export default keyboardReducer;
