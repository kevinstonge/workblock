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
    await db.update(
      {
        email: email,
      },
      { blocks: req.body.blocks },
      {},
      (err) => {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ message: "database error", errorMessage: err });
        } else {
          res.status(200).json({ message: "blocks updated successfully" });
        }
      }
    );
  }
);

export default handler;
