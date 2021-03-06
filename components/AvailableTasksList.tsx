import { store } from '../state/store';
import type { TaskFull } from '../utils/types';
import styles from '../styles/AvailableTasksList.module.scss';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import actionTypes from '../state/actionTypes';
const AvailableTasksList = () => {
  const {
    tasks,
    dispatch,
  }: {
    tasks: TaskFull[];
    dispatch: Function;
  } = useContext(store);
  return (
    <div className={styles.listContainer}>
      <ul>
        {tasks.map((task: TaskFull) => (
          <li key={`taskID-${task.id}`}>
            <div className={styles.left}>
              <strong>{task.title}</strong>
              <span className="ellipsis">{task.description}</span>
            </div>
            <div className={styles.right}>
              <button
                onClick={() => {
                  dispatch({
                    type: actionTypes.SET_ACTIVE_TASK_ID,
                    payload: task.id,
                  });
                  dispatch({
                    type: actionTypes.SET_TASK_EDITOR,
                    payload: true,
                  });
                }}
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>
              <button
                onClick={() => {
                  //need another delete confirmation here.
                  //do a full modal popup, with a list of taskSchedules the task exists in
                  //also, when a task is deleted, it then needs to be removed from all taskSchedules!
                  console.log('delete');
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
        <li>
          <div className={styles.left}>
            <button
              className={styles.addTask}
              data-glow-color={'c2'}
              onClick={() =>
                dispatch({
                  type: actionTypes.UPDATE_EDITOR,
                  payload: { taskEditor: true, activeTaskID: '' },
                })
              }
            >
              <FontAwesomeIcon icon={faPlus} />
              add a new task
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AvailableTasksList;
