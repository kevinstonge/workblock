import { store } from '../state/store';
import type { ReducerState, TaskFull } from '../utils/types';
import actionTypes from '../state/actionTypes';
import styles from '../styles/AvailableTasksList.module.scss';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
const AvailableTasksList = () => {
  const {
    state: { tasks },
    dispatch,
  }: { state: ReducerState; tasks: TaskFull[]; dispatch: Function } = useContext(store);
  return (
    <div className={styles.listContainer}>
      <ul>
        {tasks.map((t) => (
          <li>
            <span>
              <button>
                <FontAwesomeIcon icon={faArrowLeft} />
                add
              </button>
            </span>
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableTasksList;
