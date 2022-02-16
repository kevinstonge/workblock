import { NextApiRequest } from "next";
export interface NextApiRequestExtended extends NextApiRequest {
  db: any;
  dbClient: any;
}
export interface ReducerState {
  email: string;
  token: string;
  userID: string;
  blocks: Block[] | [];
  tasks: TaskFull[] | [];
  activeBlockID: string;
  duration: number;
  playing: "playing" | "paused" | "stopped" | "ended";
  timestamp: number;
  editorState: EditorState;
}

export type EditorState = {
  block: Block | undefined;
  blockEditor: boolean;
  taskEditor: boolean;
  activeTaskID: string;
  isNewBlock: boolean;
  isNewTask: boolean;
};

export interface State {
  state: ReducerState;
  dispatch: React.Dispatch<any>;
}

export type TaskFull = {
  id: string;
  title: string;
  description: string;
};

export const emptyTaskFull: TaskFull = {
  id: "",
  title: "",
  description: "",
};

export type TaskShort = {
  taskID: string;
  duration: number;
};

export type Block = {
  id: string;
  title: string;
  taskSchedule: TaskShort[];
};

export const emptyBlock: Block = {
  id: "",
  title: "",
  taskSchedule: [],
};
