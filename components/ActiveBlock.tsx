import type { NextPage } from 'next';
import styles from '../styles/Block.module.scss';
import CurrentTask from './CurrentTask';
import { useContext, useEffect, useState } from 'react';
import { store } from '../state/store';
import { ReducerState, TaskFull, TaskShort } from '../utils/types';
import timeString from '../utils/timeString';
import actionTypes from '../state/actionTypes';
const ActiveBlock: NextPage = () => {
  const {
    state: { blocks, tasks, timestamp, duration, activeBlockID },
    dispatch,
  }: {
    state: ReducerState;
    timestamp: number;
    duration: number;
    activeBlockID: number;
    dispatch: Function;
  } = useContext(store);
  useEffect(() => {
    dispatch({ type: actionTypes.SET_DURATION, payload: 0 });
  }, []);
  const [fullTaskList, setFullTaskList]: [TaskFull[], Function] = useState([
    { id: 0, taskTitle: '', taskDescription: '' },
  ]);
  useEffect(() => {
    setFullTaskList(
      blocks[activeBlockID].taskSchedule.map((scheduleItem: TaskShort) => {
        return tasks.filter((fullTask: TaskFull) => fullTask.id === scheduleItem.taskID)[0];
      }) || []
    );
  }, [activeBlockID]);
  return (
    <div className={styles.activeBlock}>
      <div className={styles.activeBlockContent}>
        <div className={styles.blockHeader}>
          <h2>Block Name</h2>
          <p>-{timeString(timestamp, duration).jsx}</p>
        </div>
        <CurrentTask fullTaskList={fullTaskList} />
      </div>
    </div>
  );
};
export default ActiveBlock;
