import Datastore from "nedb";
const db = new Datastore({ filename: "./db.db", autoload: true });

export default db;
