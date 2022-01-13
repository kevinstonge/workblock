import { useState, useEffect, useContext } from 'react';
import { store } from '../state/store';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  resetServerContext,
} from 'react-beautiful-dnd';
import styles from '../styles/DragAndDropList.module.scss';
import type { Block, TaskSchedule } from '../utils/types';

function DragAndDropList(props: any) {
  const { state, dispatch } = useContext(store);
  resetServerContext();
  const reorder = (
    list: TaskSchedule,
    startIndex: number,
    endIndex: number
  ): TaskSchedule => {
    const result: TaskSchedule = [...list];
    const removed = result.splice(startIndex, 1);
    result.splice(endIndex, 0, ...removed);
    return result;
  };

  const taskSchedule: TaskSchedule = state.blocks
    ? [...state.blocks[state.activeBlock].taskSchedule]
    : [];

  const initialState: Block = {
    id: state.activeBlock,
    taskSchedule,
  };
  const [block, setBlock] = useState<Block>(initialState);

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
    const newTaskSchedule: TaskSchedule = reorder(
      block.taskSchedule,
      result.source.index,
      result.destination.index
    );
    setBlock({ ...block, taskSchedule: newTaskSchedule });
  }
  const handleDurationChange = () => {
    console.log(block);
  };
  console.log(block);
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
            {block.taskSchedule[0].taskID &&
              block.taskSchedule.map((item: any, index: number) => (
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
                        <h3>{item.taskTitle}</h3>
                      </div>
                      <div className={styles.draggableTaskControls}>
                        <input
                          type="text"
                          value={[
                            block.taskSchedule[index].duration.toString(),
                          ]}
                          onChange={handleDurationChange}
                        ></input>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : null;
}

export default DragAndDropList;
