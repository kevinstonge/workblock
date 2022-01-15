import type { NextPage } from 'next';
import styles from '../styles/TaskList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { store } from '../state/store';
const TaskList: NextPage = () => {
  const {
    state: { activeBlockID, tasks, timestamp, duration },
    dispatch,
  } = useContext(store);
  const fullTaskList: TaskFull[] = tasks.filter((task) => {});
  return (
    <div className={styles.taskList}>
      <h2>Task List:</h2>
      <ul></ul>
      <ul>
        {/* <li className={styles.taskListItem + ' ' + styles.taskListItemActive}> */}
        <li className={styles.taskListItem + ' ' + styles.taskListItemActive}>
          <div>
            <FontAwesomeIcon icon={faPlay} />
            <p className={styles.taskTitle}>task_title asdfasdf asdfa sdf</p>
          </div>
          <div>
            <p>aasdf hasdfkl asdhflaks dhfalksdhf alksdhf alskdhf alskdhf asdhflkasdh flaksdhf</p>
            <button>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </li>
        <li className={styles.taskListItem}>
          <div>
            <FontAwesomeIcon icon={faPlay} />
            <p className={styles.taskTitle}>task_title asdfasdf asdfa sdf</p>
          </div>
          <div>
            <p>aasdf hasdfkl asdhflaks dhfalksdhf alksdhf alskdhf alskdhf asdhflkasdh flaksdhf</p>
            <button>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </li>
        <li className={styles.taskListItem}>
          <div>
            <FontAwesomeIcon icon={faPlay} />
            <p className={styles.taskTitle}>task_title asdfasdf asdfa sdf</p>
          </div>
          <div>
            <p>aasdf hasdfkl asdhflaks dhfalksdhf alksdhf alskdhf alskdhf asdhflkasdh flaksdhf</p>
            <button>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </li>
        <li className={styles.taskListItem}>
          <div>
            <FontAwesomeIcon icon={faPlay} />
            <p className={styles.taskTitle}>task_title asdfasdf asdfa sdf</p>
          </div>
          <div>
            <p>aasdf hasdfkl asdhflaks dhfalksdhf alksdhf alskdhf alskdhf asdhflkasdh flaksdhf</p>
            <button>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </li>
        <li className={styles.taskListItem}>
          <div>
            <FontAwesomeIcon icon={faPlay} />
            <p className={styles.taskTitle}>task_title asdfasdf asdfa sdf</p>
          </div>
          <div>
            <p>aasdf hasdfkl asdhflaks dhfalksdhf alksdhf alskdhf alskdhf asdhflkasdh flaksdhf</p>
            <button>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </li>
        <li className={styles.taskListItem}>
          <div>
            <FontAwesomeIcon icon={faPlay} />
            <p className={styles.taskTitle}>task_title asdfasdf asdfa sdf</p>
          </div>
          <div>
            <p>aasdf hasdfkl asdhflaks dhfalksdhf alksdhf alskdhf alskdhf asdhflkasdh flaksdhf</p>
            <button>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </li>
        <li className={styles.taskListItem}>
          <div>
            <FontAwesomeIcon icon={faPlay} />
            <p className={styles.taskTitle}>task_title asdfasdf asdfa sdf</p>
          </div>
          <div>
            <p>aasdf hasdfkl asdhflaks dhfalksdhf alksdhf alskdhf alskdhf asdhflkasdh flaksdhf</p>
            <button>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </li>
        <li className={styles.taskListItem}>
          <div>
            <FontAwesomeIcon icon={faPlay} />
            <p className={styles.taskTitle}>task_title asdfasdf asdfa sdf</p>
          </div>
          <div>
            <p>aasdf hasdfkl asdhflaks dhfalksdhf alksdhf alskdhf alskdhf asdhflkasdh flaksdhf</p>
            <button>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </li>
        <li className={styles.taskListItem}>
          <div>
            <FontAwesomeIcon icon={faPlay} />
            <p className={styles.taskTitle}>task_title asdfasdf asdfa sdf</p>
          </div>
          <div>
            <p>aasdf hasdfkl asdhflaks dhfalksdhf alksdhf alskdhf alskdhf asdhflkasdh flaksdhf</p>
            <button>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default TaskList;
