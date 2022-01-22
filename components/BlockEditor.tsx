import { NextPage } from "next";
import ModalContainer from "./ModalContainer";
import actionTypes from "../state/actionTypes";
import { store } from "../state/store";
import styles from "../styles/BlockEditor.module.scss";
import DragAndDropList from "./DragAndDropList";
import { useContext, useEffect } from "react";
import { ReducerState } from "../utils/types";
import AvailableTasksList from "./AvailableTasksList";

const BlockEditor: NextPage = () => {
  const { state, dispatch }: { state: ReducerState; dispatch: Function } =
    useContext(store);
  useEffect(() => {
    dispatch({
      type: actionTypes.UPDATE_EDITOR,
      payload: {
        block: state.blocks.filter((b) => b.id === state.activeBlockID)[0],
        tasks: state.tasks,
      },
    });
  }, [state.blocks]);
  const blockTitle = state.editorState.block.title;
  const block = state.editorState.block;

  return (
    <>
      <ModalContainer>
        <div className={styles.blockEditor}>
          <div>
            <h2>block editor</h2>
            {state.blocks.length === 0 ? (
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
              onClick={() =>
                dispatch({
                  type: "UPDATE_EDITOR",
                  payload: { blockEditor: false },
                })
              }
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
