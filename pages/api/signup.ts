import type { NextApiResponse } from "next";
import type { NextApiRequestExtended } from "../../utils/types";
import db from "../../data/db";
import { Block, TaskFull } from "../../utils/types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nextConnect from "next-connect";
import validator from "validator";
interface Doc {
  email: string;
  password: string;
  blocks: Block[];
  tasks: TaskFull[];
  _id?: string;
}
const handler = nextConnect();
handler.post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
  try {
    const email: string = req.body.email || "";
    if (!validator.isEmail(email)) {
      res.status(400).json({ message: "please provide a valid email address" });
    }
    db.findOne({ email }, (err, doc) => {
      if (err)
        res.status(500).json({ message: "database error", errorMessage: err });
      if (doc === null) {
        const newDoc: Doc = {
          email,
          password: bcrypt.hashSync(req.body.password, 7),
          blocks: [],
          tasks: [],
        };
        db.insert(newDoc, (err, document) => {
          if (err) {
            res
              .status(500)
              .json({ message: "database error", errorMessage: err });
          }
          //success:
          const token = jwt.sign(
            document.email || "",
            process.env.JWT_SECRET || ""
          );
          res.status(201).json({ token, userID: document._id });
        });
      } else {
        res.status(409).json({ message: "user already exists" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error creating account",
      error: JSON.stringify(err),
    });
  }
});

export default handler;
