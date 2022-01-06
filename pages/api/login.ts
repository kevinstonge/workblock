// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (
      bcrypt.compareSync(
        req.body.password,
        '$2b$07$YJMXuyduPnyPSft//56qPeIx4OOC1HCBZ5K90zBOtDLNZBcZGR4b2'
      )
    ) {
      const secret = process.env.JWT_SECRET;
      const token = secret
        ? jwt.sign({ email: req.body.email }, secret)
        : false;
      //need to get userID and add to response (after DB connected)
      res.status(200).json({ token });
    }
  }
}
