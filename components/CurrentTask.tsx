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
          <button className={styles.playButton}>
            <FontAwesomeIcon icon={faPlay} />
            <p>play</p>
          </button>
          <button className={styles.pauseButton}>
            <FontAwesomeIcon icon={faPause} />
            <p>pause</p>
          </button>
          <button className={styles.stopButton}>
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
