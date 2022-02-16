import db from "../../data/db";
import nextConnect from "next-connect";
import type { NextApiResponse } from "next";
import type { NextApiRequestExtended } from "../../utils/types";
import jwt, { JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
const handler = nextConnect();
handler.post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
  const authHeader: string = req.headers.authorization || "";
  const token: string = authHeader.split(" ")[1];
  const email: string | JwtPayload | null = jwt.decode(token);
  const blockID: string = uuidv4();
  await db.update(
    { email },
    //need an id for the block here!!
    { $push: { blocks: { ...req.body.block, id: blockID } } },
    {},
    (err) => {
      if (err)
        res.status(500).json({ message: "database error", errorMessage: err });
      else {
        res.status(201).json({ message: "added block successfully", blockID });
      }
    }
  );
});

export default handler;
