import { initialState } from "./initialState";
import { emptyBlock, ReducerState } from "../utils/types";
import actionTypes from "./actionTypes";
export type Action = {
  type: String;
  payload: any;
};
export const reducer = (state: ReducerState = initialState, action: Action) => {
  const getDuration = (blockID: string): number => {
    return state.blocks
      .filter((b) => b.id === blockID)[0]
      .taskSchedule.reduce(
        (durractionAcc, currentTask) => durractionAcc + currentTask.duration,
        0
      );
  };
  switch (action.type) {
    case actionTypes.RETURNING_USER_LOCAL_STORAGE:
      return action.payload;
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, ...action.payload };
    case actionTypes.LOGOUT:
      return initialState;
    case actionTypes.NEW_SESSION:
      return { ...state, ...action.payload };
    case actionTypes.UPDATE_EDITOR:
      return {
        ...state,
        editorState: {
          ...state.editorState,
          block: state.blocks.filter((b) => b.id === state.activeBlockID)[0],
          ...action.payload,
        },
      };
    case actionTypes.SET_ACTIVE_BLOCK_ID:
      return {
        ...state,
        activeBlockID: action.payload,
        duration: action.payload === -1 ? 0 : getDuration(action.payload),
      };
    case actionTypes.SET_DURATION:
      return { ...state, duration: getDuration(action.payload) };
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
    case actionTypes.SET_TIMESTAMP:
      return {
        ...state,
        timestamp: action.payload,
      };
    case actionTypes.SET_PLAYING:
      return {
        ...state,
        playing: action.payload,
      };
    case actionTypes.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          }
          return task;
        }),
      };
    case actionTypes.UPDATE_BLOCK:
      return {
        ...state,
        blocks: state.blocks.map((block) => {
          if (block.id === action.payload.id) {
            return {
              id: action.payload.id,
              title: action.payload.title,
              taskSchedule: action.payload.taskSchedule,
            };
          } else {
            return block;
          }
        }),
      };
    case actionTypes.ADD_BLOCK:
      return {
        ...state,
        blocks: [...state.blocks, action.payload],
        //if new block is created, make it the active block:
        activeBlockID: action.payload.id,
      };
    case actionTypes.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case actionTypes.CREATE_AND_EDIT_NEW_BLOCK:
      return {
        ...state,
        editorState: {
          isNewBlock: true,
          activeTaskID: "",
          block: emptyBlock,
          blockEditor: true,
          taskEditor: false,
        },
      };
    default:
      return state;
  }
};
