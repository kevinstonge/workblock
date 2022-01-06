import type { NextApiResponse } from 'next';
import type { NextApiRequestExtended } from '../../utils/types';
import types from 'mongodb';
import db from './middleware/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nextConnect from 'next-connect';
import validator from 'validator';
const handler = nextConnect();
handler.use(db);

handler.post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
  try {
    const email: string = req.body.email || '';
    if (!validator.isEmail(email)) {
      res.status(400).json({ message: 'please provide a valid email address' });
      return;
    }
    const password: string = req.body.password || '';
    const existingRecord = await req.db.collection('users').findOne({ email });
    if (existingRecord) {
      res.status(409).json({
        message: 'unable to create account: email already exists in database',
      });
      return;
    }
    const pwHash: string = bcrypt.hashSync(password, 7);
    const newUser = await req.db.collection('users').insertOne({
      email: email,
      password: pwHash,
    });
    if (newUser.insertedId) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET || '');
      res.status(201).json({ email, userID: newUser.insertedId, token });
    } else {
      res
        .status(500)
        .json({ message: 'unable to create account, database error' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'error creating account',
      error: JSON.stringify(err),
    });
  }
});

export default handler;
