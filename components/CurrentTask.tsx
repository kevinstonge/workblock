import type { NextPage } from 'next';
import styles from '../styles/CurrentTask.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStopCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { store } from '../state/store';
import actionTypes from '../state/actionTypes';
import { ReducerState, TaskShort } from '../utils/types';
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
  ] = useState([]);
  const blockDuration = fullTaskList.reduce(
    (acc: number, cur: TaskShort): number => {
      return acc + cur.duration;
    },
    0
  );
  const [currentlyPlayingTaskID, setCurrentlyPlayingTaskID]: [
    currentlyPlayingTaskID: number | undefined,
    setCurrentlyPlayingTaskID: Function
  ] = useState(undefined);
  useEffect(() => {
    setFullTaskList(
      state.blocks
        .filter((b) => b.id === activeBlockID)[0]
        .taskSchedule.filter((t) =>
          state.tasks.filter((tf) => tf.id === t.taskID)
        )
    );
  }, []);
  useEffect(() => {
    const newTS: number = timestamp ? timestamp + 1 : 1;
    const timeoutID =
      playing === true
        ? setTimeout(() => {
            console.log('tick');
            dispatch({
              type: actionTypes.SET_TIMESTAMP,
              payload: newTS,
            });
            console.log();
          }, 1000)
        : setTimeout(() => undefined, 1000);
    //call this when state.playing changes
    return () => {
      clearTimeout(timeoutID);
      //clean up the timeout
    };
  }, [playing, timestamp]);
  const timestampFiltered = (duration) => {
    const ts = duration - (timestamp || 0);
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
  return (
    <div className={styles.currentTask}>
      <div className={styles.currentTaskLeft}>
        <p className={styles.bigTime}>{timestampFiltered()}</p>
        <div className={styles.currentTaskToolbar}>
          <button
            data-glow-color="c2"
            disabled={playing === true}
            onClick={() =>
              dispatch({ type: actionTypes.SET_PLAYING, payload: true })
            }
          >
            <FontAwesomeIcon icon={faPlay} />
            <p>play</p>
          </button>
          <button
            data-glow-color="c1"
            disabled={playing !== true}
            onClick={() =>
              dispatch({ type: actionTypes.SET_PLAYING, payload: false })
            }
          >
            <FontAwesomeIcon icon={faPause} />
            <p>pause</p>
          </button>
          <button
            data-glow-color="e1"
            disabled={playing === true || playing == undefined}
            onClick={() => {
              dispatch({ type: actionTypes.SET_PLAYING, payload: undefined });
              dispatch({ type: actionTypes.SET_TIMESTAMP, payload: 0 });
            }}
          >
            <FontAwesomeIcon icon={faStopCircle} />
            <p>stop</p>
          </button>
        </div>
      </div>
      <div className={styles.currentTaskRight}>
        <h3>task name</h3>
        <p>task description</p>
        <p>task description</p>
        <p>task description</p>
        <p>task description</p>
        <p>task description</p>
        <p>task description</p>
        <p>task description</p>
        <p>task description</p>
        <p>task description</p>
        <p>task description</p>
        <p>task description</p>
        <p>task description</p>
        <p>task description</p>
        <p>task description</p>
      </div>
    </div>
  );
};

export default CurrentTask;
