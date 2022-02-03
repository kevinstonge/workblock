import type { NextPage } from "next";
import styles from "../styles/Block.module.scss";
import CurrentTask from "./CurrentTask";
import { useContext } from "react";
import { store } from "../state/store";
import { Block } from "../utils/types";
import timeString from "../utils/timeString";
const ActiveBlock: NextPage = () => {
  const {
    blocks,
    timestamp,
    activeBlockID,
  }: {
    blocks: Block[];
    timestamp: number;
    activeBlockID: number;
    dispatch: Function;
  } = useContext(store);
  const activeBlock = blocks.filter(b=>b.id===activeBlockID)[0];
  const title = activeBlock.title || '' 
  const duration = activeBlock.taskSchedule.reduce((a,c)=>{return a + c.duration},0);
  return (
    <div className={styles.activeBlock}>
      <div className={styles.activeBlockContent}>
        <div className={styles.blockHeader}>
          <h2>{title}</h2>
          <p>-{timeString(timestamp, duration).jsx}</p>
        </div>
        <CurrentTask />
      </div>
    </div>
  );
};
export default ActiveBlock;
