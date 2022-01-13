import { NextPage } from 'next';
import ModalContainer from './ModalContainer';
import actionTypes from '../state/actionTypes';
import { store } from '../state/store';
import styles from '../styles/BlockEditor.module.scss';
import DragAndDropList from './DragAndDropList';
import { useContext, useEffect } from 'react';
import { Block, ReducerState } from '../utils/types';
import TaskEditor from './TaskEditor';

const BlockEditor: NextPage = () => {
  const {state, dispatch} : {state: ReducerState, dispatch: Function} = useContext(store);
  //populate editorState on first load
  useEffect(()=>{
    
    dispatch({type: actionTypes.UPDATE_EDITOR, payload: {blocks: state.blocks, tasks: state.tasks}});
  },[]);
  const blockTitle = state.editorState.blocks.filter((b:Block)=>{
    if (b.id === state.editorState.activeTaskID) return b.title
  })[0].title;
  
  return (
    <ModalContainer>
      <div className={styles.blockEditor}>
        <h2>block editor</h2>
        {state.blocks.length === 0 ?
         <p>no blocks</p> :
        <div className={styles.twoColumn}>
          <div>
            <label htmlFor="blockTitle">
              <input type="text" id="blockTitle" name="blockTitle" value={blockTitle}></input>
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
}
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
 
      {state.editorState.taskEditor && 
        <TaskEditor />
      }
    </ModalContainer>
  );
};

export default BlockEditor;
