import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const email: string = req.body.email || "";
      const password: string = req.body.password || "";
      if (email) {
        const pwHash: string = bcrypt.hashSync(password, 7);
        const token = jwt.sign({ email }, process.env.JWT_SECRET || "");
        res.status(201).json({ token });
      }
    } catch (err) {
      res.status(500).json({
        message: "error creating account",
        error: JSON.stringify(err),
      });
    }
  }
}
