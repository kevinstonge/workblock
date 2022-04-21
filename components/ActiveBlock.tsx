import type { NextPage } from 'next';
import styles from '../styles/Block.module.scss';
import CurrentTask from './CurrentTask';
import { useContext } from 'react';
import { store } from '../state/store';
import { Block } from '../utils/types';
import timeString from '../utils/timeString';
const ActiveBlock: NextPage = () => {
  const {
    blocks,
    timestamp,
    activeBlockID,
  }: {
    blocks: Block[];
    timestamp: number;
    activeBlockID: string;
    dispatch: Function;
  } = useContext(store);
  const activeBlock =
    blocks.length > 0 ? blocks.filter((b) => b.id === activeBlockID)[0] : undefined;
  const title = activeBlock?.title || '';
  const duration = activeBlock?.taskSchedule?.reduce((a, c) => {
    return a + c.duration;
  }, 0);
  return (
    <div className={styles.activeBlock}>
      <div className={styles.activeBlockContent}>
        {activeBlock ? (
          <>
            <div className={styles.blockHeader}>
              <h2>{title}</h2>
              <p>-{timeString(timestamp, duration).jsx}</p>
            </div>
            <CurrentTask />
          </>
        ) : (
          <p>create your first block by clicking the &quote;new&quote; button above!</p>
        )}
      </div>
    </div>
  );
};
export default ActiveBlock;
