import { NextPage } from 'next';
import ModalContainer from './ModalContainer';
import actionTypes from '../state/actionTypes';
import { store } from '../state/store';
import styles from '../styles/BlockEditor.module.scss';
import TaskScheduler from './TaskScheduler';
import { useContext, useEffect } from 'react';
import { Block, EditorState } from '../utils/types';
import AvailableTasksList from './AvailableTasksList';
import { axiosA } from '../utils/axios';
import { v4 as uuidv4 } from 'uuid';

const BlockEditor: NextPage = () => {
  const {
    token,
    editorState,
    blocks,
    dispatch,
  }: {
    token: string;
    editorState: EditorState;
    blocks: Block[];
    dispatch: Function;
  } = useContext(store);
  useEffect(() => {
    if (editorState.isNewBlock === true) {
      console.log('setting empty block');
      dispatch({
        type: actionTypes.UPDATE_EDITOR,
        payload: { block: { id: '', title: '', taskSchedule: [] } },
      });
    }
  }, []);
  const saveAndClose = async () => {
    if (editorState.block !== undefined) {
      if (editorState.isNewBlock) {
        editorState.block.id = uuidv4();
        const result = await axiosA(token).post('/api/user/updateBlocks', {
          blocks: [...blocks, editorState.block],
        });
        if (result.status === 200) {
          dispatch({
            type: actionTypes.ADD_BLOCK,
            payload: editorState.block,
          });
        } else {
          console.log('saveAndClose failed? result:');
          console.log(result);
        }
      } else {
        const result = await axiosA(token).post(`/api/user/updateBlocks`, {
          blocks: blocks.map((block) => {
            if (block.id === editorState?.block?.id) {
              return editorState.block;
            } else return block;
          }),
        });
        if (result.status === 200) {
          dispatch({
            type: actionTypes.UPDATE_BLOCK,
            payload: editorState.block,
          });
        } else {
          console.log('saveAndClose failed? result:');
          console.log(result);
        }
      }
    }
    dispatch({
      type: actionTypes.UPDATE_EDITOR,
      payload: { blockEditor: false },
    });
  };

  return (
    <>
      {editorState.block !== undefined && (
        <ModalContainer>
          <div className={styles.blockEditor}>
            <div>
              <h2>block editor</h2>
              <div className={styles.twoColumn}>
                <div>
                  <label htmlFor="blockTitle">
                    <h3>title:</h3>
                    <input
                      type="text"
                      id="blockTitle"
                      name="blockTitle"
                      value={editorState.block.title}
                      onChange={(e) =>
                        dispatch({
                          type: actionTypes.UPDATE_EDITOR,
                          payload: {
                            block: {
                              ...editorState.block,
                              title: e.target.value,
                            },
                          },
                        })
                      }
                    ></input>
                  </label>
                  <h3>task schedule:</h3>
                  <div className={styles.taskScheduler}>
                    <TaskScheduler />
                  </div>
                </div>
                <div>
                  <h3>your tasks:</h3>
                  <AvailableTasksList />
                </div>
              </div>
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
                onClick={(e) => {
                  e.preventDefault();
                  saveAndClose();
                }}
                data-glow-color="c2"
              >
                save & close
              </button>
            </div>
          </div>
        </ModalContainer>
      )}
    </>
  );
};

export default BlockEditor;
