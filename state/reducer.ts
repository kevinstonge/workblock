import { initialState } from './initialState';
import { ReducerState, TaskShort } from '../utils/types';
import actionTypes from './actionTypes';
export type Action = {
  type: String;
  payload: any;
};
export const reducer = (state: ReducerState = initialState, action: Action) => {
  const getDuration = (blockID: number): number => {
    return state.blocks
      .filter((b) => b.id === blockID)[0]
      .taskSchedule.reduce((durractionAcc, currentTask) => durractionAcc + currentTask.duration, 0);
  };
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
      return {
        ...state,
        activeBlockID: action.payload,
        duration: getDuration(action.payload),
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
      if (action.payload.taskID === -1) {
        return {
          ...state,
          tasks: [...state.tasks, action.payload.updatedTask],
        };
      } else {
        return {
          ...state,
          tasks: state.tasks.map((task) => {
            if (task.id === action.payload.taskID) {
              return action.payload.updatedTask;
            }
            return task;
          }),
        };
      }
    case actionTypes.UPDATE_BLOCK:
      return {
        ...state,
        blocks: state.blocks.map((block) => {
          if (block.id === state.activeBlockID) {
            return { ...block, ...action.payload };
          } else {
            return block;
          }
        }),
      };
    default:
      return state;
  }
};
