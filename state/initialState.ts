import { Block } from '../utils/types';
export interface ReducerState {
  email: String;
  token: String | undefined;
  userID: String | undefined;
  blocks: Block[] | undefined;
  tasks: Object[] | undefined;
  activeBlock: number;
  playing: Boolean | undefined;
  timestamp: Number | undefined;
}

export interface State {
  state: ReducerState;
  dispatch: React.Dispatch<any>;
}
export const initialState: ReducerState = {
  email: '',
  token: undefined,
  userID: undefined,
  blocks: [
    {
      id: 0,
      taskSchedule: [{ taskID: 0, duration: 3 }],
    },
  ],
  tasks: [
    {
      id: 0,
      taskTitle: 'task zero [0]',
      taskDescription: 'this is a description for the first task',
    },
  ],
  activeBlock: 0,
  playing: undefined,
  timestamp: undefined,
};
