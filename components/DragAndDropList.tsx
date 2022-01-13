import { useState, useEffect, useContext } from 'react';
import { store } from '../state/store';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import styles from '../styles/DragAndDropList.module.scss';
import type { Block, TaskFull, TaskShort, EditorState, ReducerState } from '../utils/types';
import actionTypes from '../state/actionTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
function DragAndDropList(props: any) {
  const { state: {editorState, blocks, tasks, activeBlockID }, dispatch }: {state: ReducerState, editorState: EditorState, blocks: Block[], tasks: TaskFull[], activeBlockID: number, dispatch: Function} = useContext(store);
  const activeBlock: Block = editorState.blocks.filter((b:Block)=>b.id===activeBlockID)[0];
    
  const reorder = (
    list: TaskShort[],
    startIndex: number,
    endIndex: number
  ): TaskShort[] => {
    const result: TaskShort[] = [...list];
    const removed = result.splice(startIndex, 1);
    result.splice(endIndex, 0, ...removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
    const newTaskSchedule: TaskShort[] = reorder(
      activeBlock.taskSchedule,
      result.source.index,
      result.destination.index
    );
    const updatedBlocks: Block[] = editorState.blocks.map(block=>{
      if (block.id === activeBlockID) {
        return {...block, taskSchedule: newTaskSchedule}
      }
      return block;
    });
    dispatch({type: actionTypes.UPDATE_EDITOR, payload: {blocks: updatedBlocks}});
  }
  const handleDurationChange = () => {
    console.log('duration change');
  };
  const [winReady, setWinReady] = useState(false);
  useEffect(() => {
    setWinReady(true);
  }, []);
  return winReady ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.dragAndDropList}
          >
            {activeBlock?.taskSchedule[0].taskID &&
              activeBlock.taskSchedule.map((item: any, index: number) => {
                return (
                <Draggable
                  draggableId={item.taskID.toString()}
                  index={index}
                  key={item.taskID.toString()}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${styles.draggableTask} ${
                        snapshot.isDragging ? styles.draggingTask : ''
                      }`}
                    >
                      <div>
                        <h3>asdf</h3>
                      </div>
                      <div className={styles.draggableTaskControls}>
                        <input
                          type="text"
                          value={[
                            activeBlock.taskSchedule[index].duration.toString(),
                          ]}
                          onChange={handleDurationChange}
                        ></input>
                      </div>
                    </div>
                  )}
                </Draggable>
              )})}
              <button className={styles.addTask}><span><FontAwesomeIcon icon={faPlus} /></span><p>add a new task</p></button>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : null;
}

export default DragAndDropList;
