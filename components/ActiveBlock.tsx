import type { NextPage } from 'next';
import styles from '../styles/Block.module.scss';
import CurrentTask from './CurrentTask';
import { useContext, useEffect, useState } from 'react';
import { store } from '../state/store';
import { Block, emptyBlock, TaskFull, TaskShort } from '../utils/types';
import timeString from '../utils/timeString';
const ActiveBlock: NextPage = () => {
  const {
    blocks,
    timestamp,
    duration,
    activeBlockID,
  }: {
    blocks: Block[];
    tasks: TaskFull[];
    timestamp: number;
    duration: number;
    activeBlockID: number;
    dispatch: Function;
  } = useContext(store);
  const [activeBlock, setActiveBlock] = useState(emptyBlock);
  useEffect(() => {
    const activeBlock = blocks.filter((b) => b.id === activeBlockID)[0] || emptyBlock;
    setActiveBlock(activeBlock);
  }, [activeBlockID]);
  return (
    <div className={styles.activeBlock}>
      <div className={styles.activeBlockContent}>
        <div className={styles.blockHeader}>
          <h2>{activeBlock.title}</h2>
          <p>-{timeString(timestamp, duration).jsx}</p>
        </div>
        <CurrentTask />
      </div>
    </div>
  );
};
export default ActiveBlock;
