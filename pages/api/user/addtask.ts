import db from "../../../data/db";
import nextConnect from "next-connect";
import type {
  NextApiRequestExtended,
  NextApiResponseExtended,
  TaskFull,
} from "../../../utils/types";
import { v4 as uuidv4 } from "uuid";

const handler = nextConnect();
handler.post(
  async (req: NextApiRequestExtended, res: NextApiResponseExtended) => {
    const email = res.getHeader("email");
    const task: TaskFull = req.body.task;
    task.id = uuidv4();
    await db.update({ email }, { $push: { tasks: task } }, {}, (err) => {
      if (err)
        res.status(500).json({ message: "database error", errorMessage: err });
      else {
        res
          .status(201)
          .json({ message: "added task successfully", taskID: task.id });
      }
    });
  }
);

export default handler;
