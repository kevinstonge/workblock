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
      return { ...state, ...action.payload };
    case actionTypes.LOGOUT:
      return { initialState };
    case actionTypes.NEW_SESSION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
