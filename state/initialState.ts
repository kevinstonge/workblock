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
        { taskID: 0, duration: 60 },
        { taskID: 2, duration: 120 },
        { taskID: 1, duration: 240 },
      ],
    },
  ],
  tasks: [
    {
      id: 0,
      title: 'task zero [0]',
      description:
        'this is a description for the first task - let me make it a little longer so I can explore the styling of scrollbars etc',
    },
    {
      id: 1,
      title: 'task one [1]',
      description: 'this is a description for the second task',
    },
    {
      id: 2,
      title: 'task two [2]',
      description: 'this is a description for the third task',
    },
  ],
  activeBlockID: 0,
  duration: 0,
  playing: 'stopped',
  timestamp: 0,
  editorState: {
    block: { id: 0, title: '', taskSchedule: [] },
    blockEditor: false,
    isNew: false,
    taskEditor: false,
    activeTaskID: 0,
  },
};
