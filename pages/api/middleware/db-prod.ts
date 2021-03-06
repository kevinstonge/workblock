import type { NextApiResponse } from "next";
const { MongoClient } = require("mongodb");
import { NextApiRequestExtended } from "../../../utils/types";
import nextConnect from "next-connect";
const uri = process.env.MONGO_DB_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = async (
  req: NextApiRequestExtended,
  res: NextApiResponse,
  next: any
) => {
  try {
    const ObjectID = require("mongodb").ObjectID;
    if (!client.isConnected) await client.connect();
    req.dbClient = client;
    req.db = client.db("dev");
    return next();
  } catch (err) {
    res.status(500).json({ message: "unable to connect to database" });
  }
};
const db = nextConnect();
db.use(database);
export default db;
