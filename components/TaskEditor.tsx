import { NextPage } from "next";
import ModalContainer from "./ModalContainer";
import { useContext, useState } from "react";
import { store } from "../state/store";
import { EditorState, TaskFull, emptyTaskFull } from "../utils/types";
import styles from "../styles/TaskEditor.module.scss";
import actionTypes from "../state/actionTypes";
import { axiosWithAuth } from "../utils/axios";
const TaskEditor: NextPage = () => {
  const {
    editorState,
    tasks,
    dispatch,
  }: {
    editorState: EditorState;
    tasks: TaskFull[];
    dispatch: Function;
  } = useContext(store);
  const activeTask: TaskFull =
    tasks.filter((t) => t.id == editorState.activeTaskID)[0] || emptyTaskFull; // if id not in tasks, use emptyTaskFull
  const [task, setTask]: [task: TaskFull, setTask: Function] =
    useState(activeTask);
  const saveAndClose = async () => {
    if (editorState.activeTaskID === "") {
      const result = await axiosWithAuth.post("/api/user/addtask", {
        task,
      });
      if (result.status === 201) {
        dispatch({
          type: actionTypes.ADD_TASK,
          payload: { ...task, id: result.data.taskID },
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
