import db from "../../../data/db";
import nextConnect from "next-connect";
import type {
  NextApiRequestExtended,
  NextApiResponseExtended,
} from "../../../utils/types";

const handler = nextConnect();
handler.post(
  async (req: NextApiRequestExtended, res: NextApiResponseExtended) => {
    const email = res.getHeader("email");
    //what needs to happen? I'll send a block with an ID, then I need to update only the matching block:
    await db.update(
      {
        email: email,
        "blocks.id": req.body.blockID,
      },
      { $set: { "blocks.$": req.body.block } },
      {},
      (err) => {
        if (err)
          res
            .status(500)
            .json({ message: "database error", errorMessage: err });
        else {
          res.status(201).json({ message: "block updated successfully" });
        }
      }
    );
  }
);

export default handler;
