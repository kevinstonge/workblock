import { initialState } from "./initialState";
import { ReducerState } from "../utils/types";
import actionTypes from "./actionTypes";
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
    case actionTypes.UPDATE_EDITOR:
      return {
        ...state,
        editorState: { ...state.editorState, ...action.payload },
      };
    case actionTypes.SET_ACTIVE_BLOCK_ID:
      return { ...state, activeBlockID: action.payload };
    case actionTypes.SET_ACTIVE_TASK_ID:
      return {
        ...state,
        editorState: { ...state.editorState, activeTaskID: action.payload },
      };
    case actionTypes.SET_BLOCK_EDITOR:
      return { ...state, blockEditor: action.payload };
    case actionTypes.SET_TASK_EDITOR:
      return {
        ...state,
        editorState: { ...state.editorState, taskEditor: action.payload },
      };
    default:
      return state;
  }
};
