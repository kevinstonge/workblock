import type { NextPage } from 'next';
import styles from '../styles/Block.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStopCircle,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
const ActiveBlock: NextPage = () => {
  return (
    <div className={styles.activeBlock}>
      <div className={styles.blockHeader}>
        <h2>Block Name</h2>
        <p>-Ti:ME:--</p>
      </div>
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
      <div className={styles.taskList}>
        <h2>Task List:</h2>
        <div>
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
              <FontAwesomeIcon icon={faEye} />
            </div>
          </div>
          <div className={styles.taskListItem}>task2</div>
          <div className={styles.taskListItem}>task3</div>
          <div className={styles.taskListItem}>task4</div>
          <div>task4</div>
          <div>task4</div>
          <div>task4</div>
          <div>task4</div>
          <div>task4</div>
        </div>
      </div>
    </div>
  );
};
export default ActiveBlock;

//need to display TIME (remaining (?option for elapsed/remaining/both?))
//need to display current task description prominently
//other tasks past and future still visible (somehow) - small list, that pops up modal details
//full list always displayed, current task expanded, other tasks collapsed to just title in scrollable view - each item has view button to pop up view/edit dialog
