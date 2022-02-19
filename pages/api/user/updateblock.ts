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
    //https://docs.mongodb.com/manual/reference/operator/update/positional/#update-embedded-documents-using-multiple-field-matches
    //I think nedb can't do what I need to do - code in the link above returns error: "field names cannot begin with the $ character"
    await db.update(
      {
        email: email,
        blocks: {
          $elemMatch: { id: req.body.block.id },
        },
      },
      { $set: { "blocks.$": req.body.block } },
      {},
      (err) => {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ message: "database error", errorMessage: err });
        } else {
          res.status(200).json({ message: "block updated successfully" });
        }
      }
    );
  }
);

export default handler;
