import * as type from "../utils/types";

export const initialState: type.ReducerState = {
  email: "",
  token: undefined,
  userID: undefined,
  blocks: [
    {
      id: 0,
      title: "block zero [0]",
      taskSchedule: [{ taskID: 0, duration: 3 }],
    },
  ],
  tasks: [
    {
      id: 0,
      taskTitle: "task zero [0]",
      taskDescription:
        "this is a description for the first task - let me make it a little longer so I can explore the styling of scrollbars etc",
    },
    {
      id: 1,
      taskTitle: "task one [1]",
      taskDescription: "this is a description for the second task",
    },
  ],
  activeBlockID: 0,
  playing: undefined,
  timestamp: undefined,
  editorState: {
    block: { id: 0, title: "", taskSchedule: [] },
    tasks: [],
    blockEditor: true,
    taskEditor: false,
    activeTaskID: 0,
  },
};
