import { NextApiRequest } from 'next';
export interface NextApiRequestExtended extends NextApiRequest {
  db: any;
  dbClient: any;
}

export type TaskFull = {
  taskID: number;
  taskTitle: string;
  taskDescription: string;
};

export type TasksFull = TaskFull[];

export type TaskShort = {
  taskID: number;
  duration: number;
};

export type TaskSchedule = TaskShort[] | [];

export type Block = {
  id: number;
  taskSchedule: TaskSchedule;
};

export type Blocks = Block[] | [];

export type Task = {
  id: number;
  taskName: string;
  taskDescription: string;
};

export type Tasks = Task[] | [];
