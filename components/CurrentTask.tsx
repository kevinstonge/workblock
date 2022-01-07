import type { NextPage } from 'next';
import styles from '../styles/CurrentTask.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStopCircle,
} from '@fortawesome/free-solid-svg-icons';
const CurrentTask: NextPage = () => {
  return (
    <div className={styles.currentTask}>
      <div className={styles.currentTaskLeft}>
        <div className={styles.currentTaskToolbar}>
          <button data-glow-color="c2">
            <FontAwesomeIcon icon={faPlay} />
            <p>play</p>
          </button>
          <button data-glow-color="c1">
            <FontAwesomeIcon icon={faPause} />
            <p>pause</p>
          </button>
          <button data-glow-color="e1">
            <FontAwesomeIcon icon={faStopCircle} />
            <p>stop</p>
          </button>
        </div>
        <p>Ti:ME:--</p>
      </div>
      <div className={styles.currentTaskRight}>
        <h3>task name</h3>
        <p>task description</p>
      </div>
    </div>
  );
};

export default CurrentTask;
