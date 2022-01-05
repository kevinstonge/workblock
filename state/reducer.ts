import { initialState, ReducerState } from './initialState';
import actionTypes from './actionTypes';
export type Action = {
  type: String;
  payload: any;
};
export const reducer = (state: ReducerState = initialState, action: Action) => {
  console.log(state);
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, username: action.payload };
    case actionTypes.LOGOUT:
      return { ...state, username: '' };
    default:
      return state;
  }
};
