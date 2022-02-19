import db from "../../../data/db";
import nextConnect from "next-connect";
import type { NextApiResponse } from "next";
import type { NextApiRequestExtended } from "../../../utils/types";
import { v4 as uuidv4 } from "uuid";
const handler = nextConnect();
handler.post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
  const block = req.body.block;
  block.id = uuidv4();
  await db.update(
    { email: res.getHeader("email") },
    { $push: { blocks: block } },
    {},
    (err) => {
      if (err)
        res.status(500).json({
          message: "database error",
          errorMessage: err,
        });
      else {
        res.status(201).json({
          message: "added block successfully",
          blockID: block.id,
        });
      }
    }
  );
});

export default handler;
