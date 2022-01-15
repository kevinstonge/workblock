import { NextApiRequest } from 'next';
export interface NextApiRequestExtended extends NextApiRequest {
  db: any;
  dbClient: any;
}
export interface ReducerState {
  email: string;
  token: string | undefined;
  userID: number | undefined;
  blocks: Block[] | [];
  tasks: TaskFull[] | [];
  activeBlockID: number;
  duration: number;
  playing: 'playing' | 'paused' | 'stopped';
  timestamp: number;
  editorState: EditorState;
}

export type EditorState = {
  block: Block;
  blockEditor: boolean;
  taskEditor: boolean;
  activeTaskID: number;
};

export interface State {
  state: ReducerState;
  dispatch: React.Dispatch<any>;
}

export type TaskFull = {
  id: number;
  taskTitle: string;
  taskDescription: string;
};

export type TaskShort = {
  taskID: number;
  duration: number;
};

export type Block = {
  id: number;
  title: string;
  taskSchedule: TaskShort[];
};

export type Task = {
  id: number;
  taskName: string;
  taskDescription: string;
};
