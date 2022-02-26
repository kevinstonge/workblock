import nextConnect from "next-connect";
import type { NextApiResponse } from "next";
import type { NextApiRequestExtended } from "../../../utils/types";
import db from "../middleware/db-prod";
import jwt from "jsonwebtoken";

const handler = nextConnect();
handler.use(db);
handler.get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
  const token: string = req.headers.authorization?.split(" ")[1] || "";
  jwt.verify(token, process.env.JWT_SECRET || "", async (err, decoded) => {
    if (err) {
      res.status(500).json({ message: "error getting user data" });
      return;
    }
    if (decoded?.email) {
      const userData = await req.db
        .collection("users")
        .findOne({ email: decoded.email }, { password: 0 });
      res.status(200).json({ ...userData });
    }
  });
});

export default handler;
