import { NextPage } from "next";
import ModalContainer from "./ModalContainer";
import { useContext, useState } from "react";
import { store } from "../state/store";
import { EditorState, TaskFull, emptyTaskFull } from "../utils/types";
import styles from "../styles/TaskEditor.module.scss";
import actionTypes from "../state/actionTypes";
import { axiosA } from "../utils/axios";
import { v4 as uuidv4 } from "uuid";
const TaskEditor: NextPage = () => {
  const {
    token,
    editorState,
    tasks,
    dispatch,
  }: {
    token: string;
    editorState: EditorState;
    tasks: TaskFull[];
    dispatch: Function;
  } = useContext(store);
  const activeTask: TaskFull =
    tasks.filter((t) => t.id == editorState.activeTaskID)[0] || emptyTaskFull;
  const [task, setTask]: [task: TaskFull, setTask: Function] =
    useState(activeTask);
  const saveAndClose = async () => {
    //a new task has an id of ""
    if (task.id === "") {
      const newTask = { ...task, id: uuidv4() }
      const newTasks: TaskFull[] = [...tasks, newTask];
      const result = await axiosA(token).post("/api/user/updateTasks", {
        tasks: newTasks,
      });
      if (result.status === 200) {
        dispatch({
          type: actionTypes.ADD_TASK,
          payload: newTask,
        });
        dispatch({ type: actionTypes.SET_TASK_EDITOR, payload: false });
      }
    } else {
      const newTasks: TaskFull[] = tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else return t;
      });
      const result = await axiosA(token).post("/api/user/updateTasks", {
        tasks: newTasks,
      });
      if (result.status === 200) {
        dispatch({
          type: actionTypes.UPDATE_TASK,
          payload: task,
        });
        dispatch({ type: actionTypes.SET_TASK_EDITOR, payload: false });
      }
    }
  };
  return (
    <ModalContainer>
      <div className={styles.taskEditor}>
        <form>
          <h3>task editor</h3>
          <label htmlFor="taskTitle">
            <p>task title:</p>
            <input
              id="taskTitle"
              name="taskTitle"
              value={task.title}
              onChange={(e) =>
                setTask({ ...task, title: e.currentTarget.value })
              }
            />
          </label>
          <label htmlFor="taskDescription">
            <p>task description:</p>
            <textarea
              id="taskDescription"
              name="taskDescription"
              rows={10}
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.currentTarget.value })
              }
            />
          </label>
          <div className="buttonRow">
            <button
              data-glow-color="e1"
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: actionTypes.SET_TASK_EDITOR, payload: false });
              }}
            >
              discard
            </button>
            <button
              data-glow-color="c2"
              onClick={(e) => {
                e.preventDefault();
                saveAndClose();
              }}
            >
              save
            </button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};
export default TaskEditor;
