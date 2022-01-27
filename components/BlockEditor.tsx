import { NextPage } from 'next';
import ModalContainer from './ModalContainer';
import actionTypes from '../state/actionTypes';
import { store } from '../state/store';
import styles from '../styles/BlockEditor.module.scss';
import DragAndDropList from './DragAndDropList';
import { useContext } from 'react';
import { EditorState, Block, TaskFull } from '../utils/types';
import AvailableTasksList from './AvailableTasksList';

//current problem:

//when a NEW block is created, the activeBlockID is set to -1, but if the new block is not saved (i.e., actually created), the activeBlockID still points to -1 and there's no record of what the previous ID was - really activeBlockID should apply to everything except the editor.

//should the editor accept a special parameter to indicate that this is a new block?

const BlockEditor: NextPage = () => {
  const {
    blocks,
    tasks,
    editorState,
    activeBlockID,
    dispatch,
  }: {
    blocks: Block[];
    tasks: TaskFull[];
    editorState: EditorState;
    activeBlockID: number;
    dispatch: Function;
  } = useContext(store);
  const blockTitle = editorState.block.title;
  const block = editorState.block;

  return (
    <>
      <ModalContainer>
        <div className={styles.blockEditor}>
          <div>
            <h2>block editor</h2>
            {blocks.length === 0 ? (
              <p>no blocks</p>
            ) : (
              <div className={styles.twoColumn}>
                <div>
                  <label htmlFor="blockTitle">
                    <h3>title:</h3>
                    <input
                      type="text"
                      id="blockTitle"
                      name="blockTitle"
                      value={blockTitle}
                      onChange={(e) =>
                        dispatch({
                          type: actionTypes.UPDATE_EDITOR,
                          payload: {
                            block: { ...block, title: e.target.value },
                          },
                        })
                      }
                    ></input>
                  </label>
                  <div className={styles.taskSequenceContainer}>
                    <DragAndDropList />
                  </div>
                </div>
                <div>
                  <h3>available tasks:</h3>
                  <AvailableTasksList />
                </div>
              </div>
            )}
          </div>
          <div className="buttonRow">
            <button
              onClick={() =>
                dispatch({
                  type: actionTypes.UPDATE_EDITOR,
                  payload: { blockEditor: false },
                })
              }
              data-glow-color="e1"
            >
              discard & close
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: actionTypes.UPDATE_BLOCK,
                  payload: { title: blockTitle, taskSchedule: editorState.block.taskSchedule },
                });
                dispatch({
                  type: actionTypes.UPDATE_EDITOR,
                  payload: { blockEditor: false },
                });
              }}
              data-glow-color="c2"
            >
              save & close
            </button>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

export default BlockEditor;
