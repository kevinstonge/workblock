import { NextPage } from 'next';
import ModalContainer from './ModalContainer';
import { useContext, useState, useEffect } from 'react';
import { store } from '../state/store';
import { EditorState, ReducerState, Task, TaskFull } from '../utils/types';
import styles from '../styles/TaskEditor.module.scss';
import actionTypes from '../state/actionTypes';
// import { TaskFull } from "../utils/types";
const TaskEditor: NextPage = () => {
  const {
    state: {
      editorState: { activeTaskID },
      tasks,
    },
    dispatch,
  }: {
    state: ReducerState;
    editorState: EditorState;
    activeTaskID: number;
    tasks: TaskFull[];
    dispatch: Function;
  } = useContext(store);
  const activeTask: TaskFull = tasks.filter((t) => t.id == activeTaskID)[0];
  const [task, setTask]: [task: Task, setTask: Function] = useState({
    id: 0,
    taskName: '',
    taskDescription: '',
  });
  useEffect(() => {
    setTask({ ...activeTask });
  }, []);
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
              value={activeTask.taskTitle}
              onChange={() => console.log('change')}
            />
          </label>
          <label htmlFor="taskDescription">
            <p>task description:</p>
            <textarea
              id="taskDescription"
              name="taskDescription"
              rows={10}
              value={activeTask.taskDescription}
              onChange={(e) => dispatch({ type: actionTypes.UPDATE_EDITOR })}
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
                dispatch({ type: actionTypes.SET_TASK_EDITOR, payload: false });
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
