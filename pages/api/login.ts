// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';
import type { NextApiResponse } from 'next';
import type { NextApiRequestExtended } from '../../utils/types';
import db from './middleware/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const handler = nextConnect();
handler.use(db);
handler.post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
  const email: string = req.body.email || '';
  const password: string = req.body.password || '';
  const userData = await req.db.collection('users').findOne({ email });
  if (
    userData.email === email &&
    bcrypt.compareSync(password, userData.password)
  ) {
    const secret = process.env.JWT_SECRET;
    const token = secret ? jwt.sign({ email }, secret) : false;
    //need to get userID and add to response (after DB connected)
    res.status(200).json({ token, userID: userData._id });
  } else {
    res.status(401).json({ message: 'error logging in' });
  }
});

export default handler;
