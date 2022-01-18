import type { NextPage } from 'next';
import styles from '../styles/CurrentTask.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlay, faPause, faRedo, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { store } from '../state/store';
import actionTypes from '../state/actionTypes';
import { ReducerState, TaskShort, Block, TaskFull } from '../utils/types';
import timeString from '../utils/timeString';
interface Props {
  fullTaskList: TaskFull[];
}

const CurrentTask: NextPage<Props> = (props: Props) => {
  const {
    state: { blocks, duration, activeBlockID, playing, timestamp },
    dispatch,
  }: {
    state: ReducerState;
    blocks: Block[] | [];
    duration: number;
    playing: Boolean | undefined;
    timestamp: number | undefined;
    activeBlockID: number;
    dispatch: Function;
  } = useContext(store);

  const taskSchedule: TaskShort[] = blocks.filter((b: Block): Boolean => b.id === activeBlockID)[0]
    .taskSchedule;

  const [blockStatus, setBlockStatus] = useState({
    durationSum: 0,
    currentTaskIndex: 0,
    currentTaskDuration: 0,
    timeRemainingOnTask: 0,
  });

  useEffect(() => {
    let timeoutID: ReturnType<typeof setTimeout>;
    if (playing === 'playing') {
      const newBlockStatus = { ...blockStatus };
      const newTS: number = timestamp ? timestamp + 1 : 1;
      while (newBlockStatus.currentTaskIndex + 1 < taskSchedule.length) {
        newBlockStatus.currentTaskDuration = taskSchedule[newBlockStatus.currentTaskIndex].duration;
        if (newTS <= newBlockStatus.durationSum + newBlockStatus.currentTaskDuration) {
          break;
        }
        newBlockStatus.durationSum += taskSchedule[newBlockStatus.currentTaskIndex].duration;
        newBlockStatus.currentTaskIndex++;
      }
      newBlockStatus.timeRemainingOnTask =
        newBlockStatus.durationSum + newBlockStatus.currentTaskDuration - timestamp;
      setBlockStatus(newBlockStatus);

      if (timestamp === duration) {
        dispatch({ type: actionTypes.SET_PLAYING, payload: 'ended' });
        dispatch({ type: actionTypes.SET_TIMESTAMP, payload: duration });
        setBlockStatus({ ...blockStatus, timeRemainingOnTask: 0 });
      } else if (timestamp < duration) {
        timeoutID = setTimeout(() => {
          dispatch({ type: actionTypes.SET_TIMESTAMP, payload: newTS });
        }, 1000);
      }
    }
    return () => {
      clearTimeout(timeoutID);
    };
  }, [playing, timestamp]);
  return (
    <>
      <div className={styles.currentTask}>
        <div className={styles.currentTaskLeft}>
          <p className={styles.bigTime}>{timeString(blockStatus.timeRemainingOnTask)}</p>
          <div className={styles.currentTaskToolbar}>
            {playing === 'ended' ? (
              <>
                <button
                  data-glow-color="c2"
                  onClick={() => {
                    dispatch({ type: actionTypes.SET_PLAYING, payload: 'playing' });
                    dispatch({ type: actionTypes.SET_TIMESTAMP, payload: 0 });
                  }}
                >
                  <FontAwesomeIcon icon={faRedo} />
                  restart
                </button>
              </>
            ) : (
              <>
                <button
                  data-glow-color="c2"
                  disabled={playing === 'playing'}
                  onClick={() => dispatch({ type: actionTypes.SET_PLAYING, payload: 'playing' })}
                >
                  <FontAwesomeIcon icon={faPlay} />
                  <p>play</p>
                </button>
                <button
                  data-glow-color="c1"
                  disabled={playing === 'paused' || playing === 'stopped'}
                  onClick={() => dispatch({ type: actionTypes.SET_PLAYING, payload: 'paused' })}
                >
                  <FontAwesomeIcon icon={faPause} />
                  <p>pause</p>
                </button>
                <button
                  data-glow-color="e1"
                  disabled={playing === 'stopped'}
                  onClick={() => {
                    dispatch({ type: actionTypes.SET_PLAYING, payload: 'stopped' });
                    dispatch({ type: actionTypes.SET_TIMESTAMP, payload: 0 });
                  }}
                >
                  <FontAwesomeIcon icon={faStopCircle} />
                  <p>stop</p>
                </button>
              </>
            )}
          </div>
        </div>
        <div className={styles.currentTaskRight}>
          <h3>{props.fullTaskList[blockStatus.currentTaskIndex].taskTitle}</h3>
          <p>{props.fullTaskList[blockStatus.currentTaskIndex].taskDescription}</p>
        </div>
      </div>
      <div className={styles.taskList}>
        <h2>Task List:</h2>
        <ul>
          {props.fullTaskList.map((task: TaskFull, index: number) => {
            const isActive = blockStatus.currentTaskIndex === index;
            const className =
              `${styles.taskListItem}` + (isActive ? ` ${styles.taskListItemActive}` : '');
            return (
              <li className={className} key={`task_index-${index}`}>
                <div>
                  <FontAwesomeIcon icon={faPlay} />
                  <p className={styles.taskTitle}>{task.taskTitle}</p>
                </div>
                <div>
                  <p>
                    [{timeString(taskSchedule[index].duration)}]{task.taskDescription}
                  </p>
                  <button>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default CurrentTask;
