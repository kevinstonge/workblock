import db from "../../data/db";
import nextConnect from "next-connect";
import type { NextApiResponse } from "next";
import type { NextApiRequestExtended } from "../../utils/types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handler = nextConnect();
handler.post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
  const email: string = req.body.email || "";
  const password: string = req.body.password || "";
  await db.findOne({ email }, (err, doc) => {
    if (err)
      res.status(500).json({ message: "database error", errorMessage: err });
    if (doc.email === email && bcrypt.compareSync(password, doc.password)) {
      res.status(200).json({
        token: jwt.sign({ email }, process.env.JWT_SECRET || ""),
        userID: doc._id,
        blocks: doc.blocks,
        tasks: doc.tasks,
      });
    } else {
      res.status(401).json({ message: "failed to log in" });
    }
  });
});

export default handler;
