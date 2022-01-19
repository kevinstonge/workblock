import { store } from '../state/store';
import type { TaskFull } from '../utils/types';
import actionTypes from '../state/actionTypes';
import styles from '../styles/AvailableTasksList.module.scss';
const AvailableTasksList = () => {
  return (
    <div className={styles.listContainer}>
      <ul>
        <li>task!</li>
        <li>task!</li>
        <li>task!</li>
        <li>task!</li>
        <li>task!</li>
        <li>task!</li>
        <li>task!</li>
        <li>task!</li>
        <li>task!</li>
        <li>task!</li>
        <li>task!</li>
        <li>task!</li>
        <li>task!</li>
        <li>task!</li>
        <li>task!</li>
        <li>task!</li>
      </ul>
    </div>
  );
};

export default AvailableTasksList;
