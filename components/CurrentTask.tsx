import type { NextPage } from 'next';
import styles from '../styles/CurrentTask.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { JSXElementConstructor, ReactElement, useContext, useEffect, useState } from 'react';
import { store } from '../state/store';
import actionTypes from '../state/actionTypes';
import { ReducerState, TaskFull, TaskShort } from '../utils/types';
const CurrentTask: NextPage = () => {
  const {
    state, //temp?
    state: { playing, timestamp, activeBlockID },
    dispatch,
  }: {
    state: ReducerState;
    playing: Boolean | undefined;
    timestamp: number | undefined;
    activeBlockID: number;
    dispatch: Function;
  } = useContext(store);
  const [fullTaskList, setFullTaskList]: [
    fullTaskList: TaskShort[] | [],
    setFullTaskList: Function
  ] = useState([{ taskID: 0, duration: 0 }]);
  const blockDuration: number = (fullTaskList as any[]).reduce((acc, cur): number => {
    return acc + cur.duration;
  }, 0);
  console.log(blockDuration);
  useEffect(() => {
    setFullTaskList(
      state.blocks
        .filter((b) => b.id === activeBlockID)[0]
        .taskSchedule.filter((t) => state.tasks.filter((tf) => tf.id === t.taskID))
    );
  }, [activeBlockID]);
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
  const timeString = (progress: number, duration?: number): ReactElement => {
    //pass only progress for time elapsed
    //pass progress and duration for time remaining
    const ts: number = duration ? duration - progress : progress;
    const h = Math.floor(ts / 60 / 60);
    const m = Math.floor(ts / 60 - h * 60 * 60);
    const s = Math.floor(ts - (m * 60 - h * 60 * 60));
    const lz = (n: number) => (n < 10 ? `0${n}` : n);
    const { hh, mm, ss } = { hh: lz(h), mm: lz(m), ss: lz(s) };

    return (
      <>
        <span className="hh">{hh}:</span>
        <span className="mm">{mm}:</span>
        <span className="ss">{ss}</span>
      </>
    );
  };
  const [sumOfPreviousDurations, currentTaskDuration, currentTaskIndex] =
    fullTaskList.length > 0
      ? (fullTaskList as any[]).reduce(
          (value: number[], current: TaskShort, index: number) => {
            if (state.timestamp < value[0] + current.duration) {
              return [value[0], current.duration, index];
            }
            return [value[0] + current.duration, value[1], value[2]];
          },
          [0, 0, 0]
        )
      : [0, 0, 0];
  const timeRemainingOnTask = sumOfPreviousDurations + currentTaskDuration - state.timestamp;
  const currentTask: TaskFull = state.tasks[fullTaskList[currentTaskIndex].taskID];
  return (
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
        <h3>{currentTask.taskTitle}</h3>
        <p>{currentTask.taskDescription}</p>
      </div>
    </div>
  );
};

export default CurrentTask;
