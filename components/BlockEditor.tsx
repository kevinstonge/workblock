import { NextPage } from "next";
import ModalContainer from "./ModalContainer";
import actionTypes from "../state/actionTypes";
import { store } from "../state/store";
import styles from "../styles/BlockEditor.module.scss";
import DragAndDropList from "./DragAndDropList";
import { useContext } from "react";
import { EditorState, Block, TaskFull } from "../utils/types";
import AvailableTasksList from "./AvailableTasksList";

const BlockEditor: NextPage = () => {
  const {
    blocks,
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
  const blockTitle = editorState.isNew ? "" : editorState.block.title;
  const block = editorState.isNew
    ? { title: "", taskSchedule: [] }
    : editorState.block;

  const saveAndClose = () => {
    //update block in database or localStorage first,
    //then on success, update state:
    const newBlockID = 2; //get this value from backend
    if (editorState.isNew) {
      dispatch({
        type: actionTypes.ADD_BLOCK,
        payload: {
          title: blockTitle,
          taskSchedule: editorState.block.taskSchedule,
          id: newBlockID,
        },
      });
    } else {
      dispatch({
        type: actionTypes.UPDATE_BLOCK,
        payload: {
          title: blockTitle,
          taskSchedule: editorState.block.taskSchedule,
          id: activeBlockID,
        },
      });
    }
    dispatch({
      type: actionTypes.UPDATE_EDITOR,
      payload: { blockEditor: false },
    });
  };

  return (
    <>
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
            <button onClick={() => saveAndClose()} data-glow-color="c2">
              save & close
            </button>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

export default BlockEditor;
