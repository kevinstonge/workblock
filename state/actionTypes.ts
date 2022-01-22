export interface ActionTypes {
  LOGIN_SUCCESS: string;
  SIGNUP_SUCCESS: string;
  LOGOUT: string;
  NEW_SESSION: string;
  UPDATE_EDITOR: string;
  UPDATE_TASK: string;
  SET_ACTIVE_TASK_ID: string;
  SET_ACTIVE_BLOCK_ID: string;
  SET_TASK_EDITOR: string;
  SET_BLOCK_EDITOR: string;
  SET_PLAYING: string;
  SET_TIMESTAMP: string;
  SET_DURATION: string;
  UPDATE_BLOCK: string;
  payload?: any;
}
const actionTypes: ActionTypes = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  LOGOUT: "LOGOUT",
  NEW_SESSION: "NEW_SESSION",
  UPDATE_EDITOR: "UPDATE_EDITOR",
  UPDATE_TASK: "UPDATE_TASK",
  SET_ACTIVE_TASK_ID: "SET_ACTIVE_TASK_ID",
  SET_ACTIVE_BLOCK_ID: "SET_ACTIVE_BLOCK_ID",
  SET_TASK_EDITOR: "SET_TASK_EDITOR",
  SET_BLOCK_EDITOR: "SET_BLOCK_EDITOR",
  SET_PLAYING: "SET_PLAYING",
  SET_TIMESTAMP: "SET_TIMESTAMP",
  SET_DURATION: "SET_DURATION",
  UPDATE_BLOCK: "UPDATE_BLOCK",
};
export default actionTypes;
