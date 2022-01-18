import { useState, useEffect, useContext, FormEvent } from 'react';
import { store } from '../state/store';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import styles from '../styles/DragAndDropList.module.scss';
import type { TaskFull, TaskShort, EditorState, ReducerState } from '../utils/types';
import actionTypes from '../state/actionTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
function DragAndDropList(props: any) {
  const {
    state: {
      editorState: { block },
      tasks,
    },
    dispatch,
  }: {
    state: ReducerState;
    editorState: EditorState;
    taskSchedule: TaskShort[];
    tasks: TaskFull[];
    dispatch: Function;
  } = useContext(store);
  const taskSchedule = block.taskSchedule;
  const reorder = (list: TaskShort[], startIndex: number, endIndex: number): TaskShort[] => {
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
      taskSchedule,
      result.source.index,
      result.destination.index
    );
    dispatch({
      type: actionTypes.UPDATE_EDITOR,
      payload: { block: { taskSchedule: newTaskSchedule } },
    });
  };
  const showToolTip = (text: string): void => {
    console.log('tooltip: ', text); //todo - add this feature
  };
  const updateDuration = (e: FormEvent<HTMLInputElement>, item: TaskShort) => {
    //to do: error check duration entries
    dispatch({
      type: actionTypes.UPDATE_EDITOR,
      payload: {
        block: {
          ...block,
          taskSchedule: taskSchedule.map((t) => {
            if (t.taskID === item.taskID)
              return {
                ...item,
                duration: e.currentTarget.value,
              };
          }),
        },
      },
    });
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
            {taskSchedule.map((item: any, index: number) => {
              const fullTask = tasks.filter((t) => t.id === item.taskID)[0];

              return (
                <Draggable
                  draggableId={item.taskID.toString()}
                  index={index}
                  key={`task_index-${index.toString()}`}
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
                      <p onMouseOver={() => showToolTip(fullTask.taskDescription)}>
                        {fullTask.taskTitle}
                      </p>
                      <label className={styles.draggableTaskControls}>
                        <input
                          type="text"
                          name="durationHours"
                          placeholder="HH"
                          size={2}
                          data-placeholder-color="c1"
                          maxLength={2}
                          value={item.duration}
                          onChange={(e) => {
                            updateDuration(e, item);
                          }}
                        ></input>
                        :
                        <input
                          type="text"
                          name="durationMinutes"
                          placeholder="MM"
                          size={2}
                          data-placeholder-color="c2"
                          maxLength={2}
                          max={59}
                          value={item.duration}
                          onChange={(e) => {
                            updateDuration(e, item);
                          }}
                        ></input>
                      </label>
                    </div>
                  )}
                </Draggable>
              );
            })}
            <button
              className={styles.addTask}
              onClick={() =>
                dispatch({
                  type: actionTypes.UPDATE_EDITOR,
                  payload: { taskEditor: true, activeTaskID: 0 },
                })
              }
            >
              <span>
                <FontAwesomeIcon icon={faPlus} />
              </span>
              <p>add a new task</p>
            </button>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : null;
}

export default DragAndDropList;
