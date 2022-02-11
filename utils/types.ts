import { NextApiRequest } from "next";
export interface NextApiRequestExtended extends NextApiRequest {
  db: any;
  dbClient: any;
}
export interface ReducerState {
  email: string;
  token: string | undefined;
  userID: string;
  blocks: Block[] | [];
  tasks: TaskFull[] | [];
  activeBlockID: number;
  duration: number;
  playing: "playing" | "paused" | "stopped" | "ended";
  timestamp: number;
  editorState: EditorState;
}

export type EditorState = {
  block: Block;
  blockEditor: boolean;
  taskEditor: boolean;
  activeTaskID: number;
  isNew: boolean;
};

export interface State {
  state: ReducerState;
  dispatch: React.Dispatch<any>;
}

export type TaskFull = {
  id: number;
  title: string;
  description: string;
};

export const emptyTaskFull: TaskFull = {
  id: -1,
  title: "",
  description: "",
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

export const emptyBlock: Block = {
  id: -1,
  title: "",
  taskSchedule: [],
};
