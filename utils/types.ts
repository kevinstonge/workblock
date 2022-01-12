import { NextApiRequest } from 'next';
export interface NextApiRequestExtended extends NextApiRequest {
  db: any;
  dbClient: any;
}

export type Task = {
  id: number;
  taskName: string;
  taskDescription: string;
};

export type BlockTask = {
  taskID: number;
  duration: number;
};
