import { useState, useEffect, useContext, FormEvent } from "react";
import { store } from "../state/store";
import styles from "../styles/TaskScheduler.module.scss";
import type { TaskFull, TaskShort, EditorState } from "../utils/types";
import actionTypes from "../state/actionTypes";
import timeString from "../utils/timeString";
function TaskScheduler() {
  const {
    editorState,
    tasks,
    dispatch,
  }: {
    editorState: EditorState;
    tasks: TaskFull[];
    dispatch: Function;
  } = useContext(store);
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

  const showToolTip = (text: string): void => {
    console.log("tooltip: ", text); //todo - add this feature
  };
  const updateDuration = (
    e: FormEvent<HTMLInputElement>,
    item: TaskShort,
    unit: "h" | "m"
  ) => {
    const filteredInput: string = e.currentTarget.value.replace(/\D{0-2}/, "");
    const input: number = parseInt(filteredInput) ? parseInt(filteredInput) : 0;
    const inputInSeconds = unit === "h" ? input * 60 * 60 : input * 60;
    const oldDuration = item.duration;
    const oldDurationTimeData = timeString(oldDuration).rawData;
    const oldDurationAddend =
      unit === "h"
        ? oldDurationTimeData.m * 60
        : oldDurationTimeData.h * 60 * 60;
    const newDuration = inputInSeconds + oldDurationAddend;
    dispatch({
      type: actionTypes.UPDATE_EDITOR,
      payload: {
        block: {
          ...editorState.block,
          taskSchedule: editorState?.block?.taskSchedule.map((t) => {
            if (t.taskID === item.taskID) {
              return {
                ...item,
                duration: newDuration,
              };
            }
            return t;
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
    <>
      {editorState?.block?.taskSchedule &&
        editorState.block.taskSchedule.map((item: TaskShort, index: number) => {
          const fullTask = tasks.filter((t) => t.id === item.taskID)[0];
          const durationData = timeString(item.duration).rawData;
          return (
            <div
              id={`ts_di_id-${index.toString()}`}
              key={`ts_di_key-${index.toString()}`}
            >
              <div className={`${styles.task}`}>
                <p onMouseOver={() => showToolTip(fullTask.description)}>
                  {fullTask.title}
                </p>
                <label className={styles.taskControls}>
                  <input
                    type="text"
                    name="durationHours"
                    size={2}
                    data-placeholder-color="c1"
                    maxLength={2}
                    value={durationData.h}
                    onChange={(e) => {
                      updateDuration(e, item, "h");
                    }}
                    autoComplete="off"
                  ></input>
                  :
                  <input
                    type="text"
                    name="durationMinutes"
                    size={2}
                    data-placeholder-color="c2"
                    maxLength={2}
                    value={durationData.m}
                    onChange={(e) => {
                      updateDuration(e, item, "m");
                    }}
                    autoComplete="off"
                  ></input>
                </label>
              </div>
            </div>
          );
        })}
    </>
  ) : null;
}
export default TaskScheduler;
