import * as type from "../utils/types";

export const initialState: type.ReducerState = {
  email: "",
  token: "",
  userID: "",
  blocks: [],
  tasks: [],
  activeBlockID: "",
  duration: 0,
  playing: "stopped",
  timestamp: 0,
  editorState: {
    block: undefined,
    blockEditor: false,
    isNewBlock: false,
    isNewTask: false,
    taskEditor: false,
    activeTaskID: " ",
  },
};
