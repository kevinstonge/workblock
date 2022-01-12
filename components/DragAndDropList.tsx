import { useState, useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  resetServerContext,
} from 'react-beautiful-dnd';
import styles from '../styles/DragAndDropList.module.scss';
type Block = {
  id: string;
  taskTitle: string;
  taskDescription: string;
};

const initial = Array.from({ length: 10 }, (v, k) => k).map((k) => {
  const custom: any = {
    taskID: k.toString(),
    taskTitle: `task name [${k}]`,
    taskDescription: '',
  };

  return custom;
});

function DragAndDropList() {
  resetServerContext();
  const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = [...list];
    const removed = result.splice(startIndex, 1);
    result.splice(endIndex, 0, ...removed);
    return result;
  };
  const [block, setBlock] = useState<Block[]>(initial);

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
    const newBlock = reorder(
      block,
      result.source.index,
      result.destination.index
    );
    setBlock(newBlock);
  }
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
            {block.map((item: any, index: number) => (
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
                    {item.taskTitle}
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
