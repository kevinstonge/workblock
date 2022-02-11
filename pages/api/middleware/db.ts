import Datastore from "nedb";
import { Block, TaskFull } from "../../../utils/types";
const db = new Datastore({ filename: "./db.db", autoload: true });
const errorResponse = (errorMessasge: Error) => {
  return { status: 500, message: "database error", errorMessasge };
};
interface UserObject {
  email: string;
  password: string;
}
interface NewUserObject extends UserObject {
  blocks: Block[];
  tasks: TaskFull[];
}
const createUser = (userObject: UserObject) => {
  const email = userObject.email;
  db.findOne({ email }, (err, doc) => {
    if (err) return errorResponse(err);
    if (doc === null) {
      const newUserObject: NewUserObject = {
        ...userObject,
        blocks: [],
        tasks: [],
      };
      db.insert(newUserObject, (err, doc) => {
        if (err) return errorResponse(err);
        return { status: 201, doc };
      });
    } else {
      return { status: 409, message: "user already exists" };
    }
  });
};

const addTask = (userID: number, taskObject: TaskFull) => {
  db.update(
    { id: userID },
    { $push: { tasks: taskObject } },
    {},
    (err, doc) => {
      if (err) return errorResponse(err);
      return doc;
    }
  );
};

export { createUser, addTask };
