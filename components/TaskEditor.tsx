import { NextPage } from "next";
import ModalContainer from './ModalContainer';
import { useContext } from "react";
import { store } from "../state/store";
import { EditorState, ReducerState, TaskFull } from "../utils/types";
// import { TaskFull } from "../utils/types";
const TaskEditor: NextPage = () => {
    const {state: { editorState: {activeTaskID}, tasks }, dispatch }: { state: ReducerState, editorState: EditorState, activeTaskID: number, tasks: TaskFull[], dispatch: Function} = useContext(store);
    const activeTask:TaskFull = tasks.filter(t=>t.id == activeTaskID)[0];
    return (
    <ModalContainer>
        <form>
        <label htmlFor="taskTitle">
            <input id="taskTitle" name="taskTitle" value={activeTask.taskTitle} />
        </label>
        </form>
        
    </ModalContainer>
    );
}
export default TaskEditor;