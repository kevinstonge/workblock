import type { NextPage } from 'next';
import styles from '../styles/TaskList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { store } from '../state/store';
import { TaskFull, TaskShort } from '../utils/types';
const TaskList: NextPage = () => {
  const {
    state: { activeBlockID, tasks, blocks },
    dispatch,
  } = useContext(store);
  const fullTaskList = blocks[activeBlockID].taskSchedule.map((b) => {
    return tasks.filter((t) => t.id === b.taskID);
  });
  console.log(fullTaskList);
  return (
    <div className={styles.taskList}>
      <h2>Task List:</h2>
      <ul>
        {fullTaskList.map((task: TaskFull[]) => {
          const isActive = true; //just need to set this
          const className =
            `${styles.taskListItem}` + (isActive ? ` ${styles.taskListItemActive}` : '');
          return (
            <li className={className}>
              <div>
                <FontAwesomeIcon icon={faPlay} />
                <p className={styles.taskTitle}>{task[0].taskTitle}</p>
              </div>
              <div>
                <p>{task[0].taskDescription}</p>
                <button>
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default TaskList;
