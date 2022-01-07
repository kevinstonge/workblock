import type { NextPage } from 'next';
import styles from '../styles/TaskList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlay } from '@fortawesome/free-solid-svg-icons';
const TaskList: NextPage = () => {
  return (
    <div className={styles.taskList}>
      <h2>Task List:</h2>
      <div>
        <div className={styles.taskListItem + ' ' + styles.taskListItemActive}>
          <div>
            <FontAwesomeIcon icon={faPlay} />
            <p className={styles.taskTitle}>task_title asdfasdf asdfa sdf</p>
          </div>
          <div>
            <p>
              aasdf hasdfkl asdhflaks dhfalksdhf alksdhf alskdhf alskdhf
              asdhflkasdh flaksdhf
            </p>
            <button>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </div>
        <div className={styles.taskListItem}>
          <div>
            <FontAwesomeIcon icon={faPlay} />
            <p className={styles.taskTitle}>task_title asdfasdf asdfa sdf</p>
          </div>
          <div>
            <p>
              aasdf hasdfkl asdhflaks dhfalksdhf alksdhf alskdhf alskdhf
              asdhflkasdh flaksdhf
            </p>
            <button>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskList;
