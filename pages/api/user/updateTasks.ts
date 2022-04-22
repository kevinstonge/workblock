import db from '../../../data/db';
import nextConnect from 'next-connect';
import type { NextApiRequestExtended, NextApiResponseExtended } from '../../../utils/types';

const handler = nextConnect();
handler.post(async (req: NextApiRequestExtended, res: NextApiResponseExtended) => {
  const email = res.getHeader('email');
  const tasks = req.body.tasks;
  await db.update({ email }, { $set: { tasks: tasks } }, {}, (err) => {
    if (err) res.status(500).json({ message: 'database error', errorMessage: err });
    else {
      res.status(200).json({ message: 'tasks updated successfully' });
    }
  });
});

export default handler;
