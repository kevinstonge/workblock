import * as type from "../utils/types";

export const initialState: type.ReducerState = {
  email: "",
  token: "",
  userID: "",
  blocks: [],
  tasks: [],
  activeBlockID: 0,
  duration: 0,
  playing: "stopped",
  timestamp: 0,
  editorState: {
    block: undefined,
    blockEditor: false,
    isNew: false,
    taskEditor: false,
    activeTaskID: 0,
  },
};
