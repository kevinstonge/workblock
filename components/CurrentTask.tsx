import type { NextPage } from 'next';
import styles from '../styles/CurrentTask.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlay, faPause, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect } from 'react';
import { store } from '../state/store';
import actionTypes from '../state/actionTypes';
import { ReducerState, TaskShort, Block, TaskFull } from '../utils/types';
import timeString from '../utils/timeString';
interface NextPageProps extends NextPage {
  fullTaskList?: TaskFull[];
}

const CurrentTask: NextPageProps = (props: NextPageProps) => {
  const {
    state: { blocks, activeBlockID, playing, timestamp },
    dispatch,
  }: {
    state: ReducerState;
    blocks: Block[] | [];
    playing: Boolean | undefined;
    timestamp: number | undefined;
    activeBlockID: number;
    dispatch: Function;
  } = useContext(store);

  useEffect(() => {
    const newTS: number = timestamp ? timestamp + 1 : 1;
    const timeoutID =
      playing === 'playing'
        ? setTimeout(() => {
            console.log('tick');
            dispatch({
              type: actionTypes.SET_TIMESTAMP,
              payload: newTS,
            });
            console.log();
          }, 1000)
        : setTimeout(() => undefined, 1000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [playing, timestamp]);

  const [sumOfPreviousDurations, currentTaskDuration, currentTaskIndex] = blocks.filter(
    (b) => b.id === activeBlockID
  )[0].id
    ? (props.fullTaskList as any[]).reduce(
        (value: number[], current: TaskShort, index: number) => {
          if (timestamp < value[0] + current.duration) {
            return [value[0], current.duration, index];
          }
          return [value[0] + current.duration, value[1], value[2]];
        },
        [0, 0, 0]
      )
    : [0, 0, 0];
  const timeRemainingOnTask = sumOfPreviousDurations + currentTaskDuration - timestamp;
  return (
    <>
      <div className={styles.currentTask}>
        <div className={styles.currentTaskLeft}>
          <p className={styles.bigTime}>{timeString(timeRemainingOnTask)}</p>
          <div className={styles.currentTaskToolbar}>
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
          </div>
        </div>
        <div className={styles.currentTaskRight}>
          <h3>{props.fullTaskList[currentTaskIndex].taskTitle}</h3>
          <p>{props.fullTaskList[currentTaskIndex].taskDescription}</p>
        </div>
      </div>
      <div className={styles.taskList}>
        <h2>Task List:</h2>
        <ul>
          {props.fullTaskList.map((task: TaskFull) => {
            const isActive = true; //just need to set this
            const className =
              `${styles.taskListItem}` + (isActive ? ` ${styles.taskListItemActive}` : '');
            return (
              <li className={className}>
                <div>
                  <FontAwesomeIcon icon={faPlay} />
                  <p className={styles.taskTitle}>{task.taskTitle}</p>
                </div>
                <div>
                  <p>{task.taskDescription}</p>
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
