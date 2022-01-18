import * as type from '../utils/types';

export const initialState: type.ReducerState = {
  email: '',
  token: undefined,
  userID: undefined,
  blocks: [
    {
      id: 0,
      title: 'block zero [0]',
      taskSchedule: [
        { taskID: 0, duration: 3 },
        { taskID: 1, duration: 2 },
        { taskID: 0, duration: 2 },
      ],
    },
  ],
  tasks: [
    {
      id: 0,
      taskTitle: 'task zero [0]',
      taskDescription:
        'this is a description for the first task - let me make it a little longer so I can explore the styling of scrollbars etc',
    },
    {
      id: 1,
      taskTitle: 'task one [1]',
      taskDescription: 'this is a description for the second task',
    },
  ],
  activeBlockID: 0,
  duration: 0,
  playing: 'stopped',
  timestamp: 0,
  editorState: {
    block: { id: 0, title: '', taskSchedule: [] },
    blockEditor: false,
    taskEditor: false,
    activeTaskID: 0,
  },
};
