import { NextPage } from 'next';
import ModalContainer from './ModalContainer';
import actionTypes from '../state/actionTypes';
import { store } from '../state/store';
import styles from '../styles/BlockEditor.module.scss';
import DragAndDropList from './DragAndDropList';
import { useContext, useEffect } from 'react';
import { EditorState, Block } from '../utils/types';
import TaskEditor from './TaskEditor';

const BlockEditor: NextPage = () => {
  const {state, dispatch} = useContext(store);
  useEffect(()=>{
    const editorState = state.editorState;
    if (editorState.blocks.length > 0) return;
    const initialEditorState: EditorState = {
      blocks: [],
      tasks: [],
      blockEditor: true,
      taskEditor: false,
      activeTaskID: 0,
    }
    if (state.blocks.length > 0) {
      dispatch({type: actionTypes.UPDATE_EDITOR, payload: {blocks: [...state.blocks.filter((b:Block)=>b.id === state.activeBlockID)]}});
    }
  },[])
  return (
    <ModalContainer>
      <div className={styles.blockEditor}>
        <h2>block editor</h2>
        <div className={styles.twoColumn}>
          <div>
            <label htmlFor="blockTitle">
              <p>block title:</p>
              <input type="text" id="blockTitle" name="blockTitle"></input>
            </label>
            <div className={styles.taskSequenceContainer}>
              <DragAndDropList />
            </div>
          </div>
          <div>
            <h3>task list:</h3>
            <ul>
              <li>task 1</li>
              <li>task 2</li>
            </ul>
          </div>
        </div>
        <div className={styles.buttonRow}>
          <button
            onClick={() => dispatch({ type: actionTypes.UPDATE_EDITOR, payload: { blockEditor: false }})}
            data-glow-color="e1"
          >
            discard & close
          </button>
          <button
            onClick={() => dispatch({ type: "UPDATE_EDITOR", payload: {blockEditor: false} })}
            data-glow-color="c2"
          >
            save & close
          </button>
        </div>
      </div>
      {editorState.taskEditor && 
        <TaskEditor />
      }
    </ModalContainer>
  );
};

export default BlockEditor;
