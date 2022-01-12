import { NextPage } from 'next';
import { DragEvent, SetStateAction, useState } from 'react';
import styles from '../styles/DragAndDrop.module.scss';
import { Task, BlockTask } from '../utils/types';
const DragAndDropList: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, taskName: 'asdf', taskDescription: 'asdf' },
    { id: 2, taskName: 'asdf', taskDescription: 'asdf' },
    { id: 3, taskName: 'asdf', taskDescription: 'asdf' },
    { id: 4, taskName: 'asdf', taskDescription: 'asdf' },
    { id: 5, taskName: 'asdf', taskDescription: 'asdf' },
    { id: 6, taskName: 'asdf', taskDescription: 'asdf' },
  ]);
  const [block, setBlock] = useState<BlockTask[]>([
    { taskID: 0, duration: 600 },
    { taskID: 1, duration: 600 },
    { taskID: 2, duration: 300 },
    { taskID: 3, duration: 300 },
    { taskID: 4, duration: 600 },
  ]);
  const getSide = (e: DragEvent<HTMLDivElement>): string => {
    const { height, top } = e.currentTarget.getBoundingClientRect();
    const yPos: number = e.pageY - top;
    const side: string = yPos / height < 0.5 ? 'top' : 'bottom';
    return side || 'none';
  };
  const getElementId = (e: DragEvent<HTMLDivElement>): string => {
    return e.currentTarget.getAttribute('data-taskslotindex') || '';
  };
  const getAdjacentElementId = (id: string, side: string): string => {
    return side === 'top'
      ? id === '0'
        ? 'none'
        : `${parseInt(id) - 1}`
      : id === (block.length - 1).toString() //bottom side of target if id=block length{
      ? `none`
      : `${parseInt(id) + 1}`;
  };
  const getHypotheticalOldAdjacentID = (id: string, side: string): string => {
    return side === 'top'
      ? id === (block.length - 1).toString()
        ? 'none'
        : `${parseInt(id) + 1}`
      : id === '0'
      ? 'none'
      : `${parseInt(id) - 1}`;
  };
  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const side = getSide(e);
    e.currentTarget.setAttribute('data-taskslotstyle', `highlight-${side}`);
    const id: string = getElementId(e);
    const adjacentElementID = getAdjacentElementId(id, side);

    const adjacentElement = document.querySelector(
      `#draggableTaskSlot-${adjacentElementID}`
    );
    if (adjacentElement) {
      const oppositeSide = side === 'top' ? 'bottom' : 'top';
      adjacentElement.setAttribute(
        'data-taskslotstyle',
        `highlight-${oppositeSide}`
      );
    }
    const hypotheticalOldAdjacentID = getHypotheticalOldAdjacentID(id, side);
    if (hypotheticalOldAdjacentID) {
      const hypotheticalOldAdjacentElement = document.querySelector(
        `#draggableTaskSlot-${hypotheticalOldAdjacentID}`
      );
      if (hypotheticalOldAdjacentElement) {
        hypotheticalOldAdjacentElement.setAttribute(
          'data-taskslotstyle',
          'none'
        );
      }
    }
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // e.currentTarget.setAttribute('data-taskslotstyle', 'none');
  };

  const array_move = (
    arr: BlockTask[],
    old_index: string,
    new_index: string
  ): BlockTask[] => {
    const oldIndex = parseInt(old_index);
    const newIndex = parseInt(new_index);
    const element: BlockTask = arr[oldIndex];
    const arrayMinusElement = [
      ...arr.slice(0, oldIndex),
      ...arr.slice(oldIndex + 1, arr.length),
    ];
    const newArray: BlockTask[] = [
      ...arrayMinusElement.slice(0, newIndex),
      element,
      ...arrayMinusElement.slice(newIndex, arrayMinusElement.length),
    ];
    return newArray;
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const targetIndex: string =
      e.currentTarget.getAttribute('data-taskslotindex') || '';
    const sourceIndex = e.dataTransfer.getData('draggable-task');
    const newBlock = array_move(block, sourceIndex, targetIndex);
    setBlock(newBlock);
    clearAllDraggableTaskSlotBackgrounds();
  };

  const clearAllDraggableTaskSlotBackgrounds = () => {
    block.forEach((task, index) => {
      document
        .querySelector(`#draggableTaskSlot-${index}`)
        ?.setAttribute('data-taskslotstyle', 'none');
    });
  };
  return (
    <div
      className={styles.dragAndDropList}
      onDragLeave={clearAllDraggableTaskSlotBackgrounds}
    >
      {block.map((e, index) => {
        return (
          <div
            className={styles.draggableTaskSlot}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragLeave={onDragLeave}
            data-taskslotindex={index}
            data-taskslotstyle="none"
            key={`draggableTaskSlot-${index}`}
            id={`draggableTaskSlot-${index}`}
          >
            <div
              className={styles.draggableTask}
              draggable="true"
              data-index={index}
              onDragStart={(e) => {
                const oldIndex = e.currentTarget.getAttribute('data-index');
                oldIndex && e.dataTransfer.setData('draggable-task', oldIndex);
              }}
            >
              <p>task name {e.taskID}</p>
              <p>e, [d]</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default DragAndDropList;
