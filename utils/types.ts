import { NextApiRequest } from "next";
export interface NextApiRequestExtended extends NextApiRequest {
  db: any;
  dbClient: any;
}
export interface ReducerState {
  email: String;
  token: String | undefined;
  userID: String | undefined;
  blocks: Block[] | [];
  tasks: TaskFull[] | [];
  activeBlockID: number;
  playing: Boolean | undefined;
  timestamp: Number | undefined;
  editorState: EditorState;
}

export type EditorState = {
  block: Block;
  tasks: TaskFull[] | [];
  blockEditor: Boolean;
  taskEditor: Boolean;
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
