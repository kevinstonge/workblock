import { NextApiRequest } from 'next';
export interface NextApiRequestExtended extends NextApiRequest {
  db: any;
  dbClient: any;
}
