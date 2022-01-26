import StateProvider, { store } from '../state/store';
import { Block, EditorState, emptyBlock, ReducerState, TaskFull, TaskShort } from '../utils/types';
import styles from '../styles/AvailableTasksList.module.scss';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus, faGear, faEye } from '@fortawesome/free-solid-svg-icons';
import actionTypes from '../state/actionTypes';
const AvailableTasksList = () => {
  const {
    tasks,
    blocks,
    activeBlockID,
    editorState,
    dispatch,
  }: {
    tasks: TaskFull[];
    blocks: Block[];
    activeBlockID: number;
    editorState: EditorState;
    dispatch: Function;
  } = useContext(store);
  return (
    <div className={styles.listContainer}>
      <ul>
        {tasks.map((task: TaskFull) => (
          <li key={`taskID-${task.id}`}>
            <span className={styles.left}>
              <button
                data-glow-color="c2"
                className="double-icon"
                onClick={() => {
                  dispatch({
                    type: actionTypes.UPDATE_EDITOR,
                    payload: {
                      block: {
                        ...editorState.block,
                        taskSchedule: [
                          ...editorState.block.taskSchedule,
                          { taskID: task.id, duration: 300 },
                        ],
                      },
                    },
                  });
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="f1 bottom-icon" />
                <FontAwesomeIcon icon={faPlus} className="c1 top-icon" />
              </button>

              {task.title}
            </span>
            <span className={styles.right}>
              <button
                onClick={() => {
                  dispatch({
                    type: actionTypes.SET_ACTIVE_TASK_ID,
                    payload: task.id,
                  });
                  dispatch({
                    type: actionTypes.SET_TASK_EDITOR,
                    payload: true,
                  });
                }}
              >
                <FontAwesomeIcon icon={faGear} />/
                <FontAwesomeIcon icon={faEye} />
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableTasksList;
