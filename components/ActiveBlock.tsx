import type { NextPage } from 'next';
import styles from '../styles/Block.module.scss';
import CurrentTask from './CurrentTask';
import TaskList from './TaskList';
const ActiveBlock: NextPage = () => {
  return (
    <div className={styles.activeBlock}>
      <div className={styles.activeBlockContent}>
        <div className={styles.blockHeader}>
          <h2>Block Name</h2>
          <p>-Ti:ME:--</p>
        </div>
        <CurrentTask />
        <TaskList />
      </div>
    </div>
  );
};
export default ActiveBlock;
