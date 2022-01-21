import { store } from "../state/store";
import type { ReducerState, TaskFull } from "../utils/types";
import styles from "../styles/AvailableTasksList.module.scss";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPlus,
  faGear,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
const AvailableTasksList = () => {
  const {
    state: { tasks },
    dispatch,
  }: { state: ReducerState; tasks: TaskFull[]; dispatch: Function } =
    useContext(store);
  return (
    <div className={styles.listContainer}>
      <ul>
        {tasks.map((t) => (
          <li key={`taskID-${t.id}`}>
            <span className={styles.left}>
              <button data-glow-color="c2" className="double-icon">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="f1 bottom-icon"
                />
                <FontAwesomeIcon icon={faPlus} className="c1 top-icon" />
              </button>

              {t.title}
            </span>
            <span className={styles.right}>
              <button>
                <FontAwesomeIcon icon={faGear} />/
                <FontAwesomeIcon icon={faEye} />
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableTasksList;
