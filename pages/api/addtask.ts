import db from "../../data/db";
import nextConnect from "next-connect";
import type { NextApiResponse } from "next";
import type { NextApiRequestExtended } from "../../utils/types";
import jwt from "jsonwebtoken";

const handler = nextConnect();
handler.post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split(" ")[1];
  const email = jwt.decode(token || "");
  await db.update(
    { email },
    { $push: { tasks: req.body.task } },
    {},
    (err, doc) => {
      if (err)
        res.status(500).json({ message: "database error", errorMessage: err });
      else {
        res.status(201).json({ message: "added task successfully", doc });
      }
    }
  );
});

export default handler;
