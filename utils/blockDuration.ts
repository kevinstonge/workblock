import { TaskShort } from './types';

const blockDuration = (fullTaskList: TaskShort[]) =>
  (fullTaskList as TaskShort[]).reduce((acc, cur): number => {
    return acc + cur.duration;
  }, 0);
export default blockDuration;
