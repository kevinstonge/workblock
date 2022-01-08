import { NextPage } from "next";
import ModalContainer from "./ModalContainer";
import styles from "../styles/BlockEditor.module.scss";
interface Props {
  blockEditor: Object;
  setBlockEditor: Function;
}
const BlockEditor: NextPage<Props> = (props: Props) => {
  const { blockEditor, setBlockEditor } = props;
  return (
    <ModalContainer>
      <div className={styles.blockEditor}>
        <h2>block editor</h2>
        <div className={styles.twoColumn}>
          <div>
            <form>
              <label htmlFor="blockTitle">
                <p>block title:</p>
                <input type="text" id="blockTitle" name="blockTitle"></input>
              </label>
            </form>
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
            onClick={() => setBlockEditor({ ...blockEditor, visible: false })}
            data-glow-color="e1"
          >
            discard & close
          </button>
          <button
            onClick={() => setBlockEditor({ ...blockEditor, visible: false })}
            data-glow-color="c2"
          >
            save & close
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default BlockEditor;
