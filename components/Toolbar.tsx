import type { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faTableColumns,
  faPlus,
  faTrash,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
import SelectBlock from "./SelectBlock";
import styles from "../styles/Toolbar.module.scss";
import { useState } from "react";
const Toolbar: NextPage = () => {
  const [selectBlockVisible, setSelectBlockVisible] = useState(false);
  return (
    <div className={styles.toolbar}>
      <ul>
        <li>
          <button
            data-glow-color="c1"
            className={styles.b2 + " " + styles.dropdownButton}
            onClick={(e) => {
              e.stopPropagation();
              setSelectBlockVisible(!selectBlockVisible);
            }}
          >
            <span className="double-icon">
              <FontAwesomeIcon icon={faTableColumns} className="bottom-icon" />
              <FontAwesomeIcon icon={faArrowsRotate} className="c1 top-icon" />
            </span>
            <p>select block</p>
            {selectBlockVisible && (
              <div
                className={styles.dropdownContent}
                onClick={(e) => e.stopPropagation()}
              >
                <SelectBlock setSelectBlockVisible={setSelectBlockVisible} />
              </div>
            )}
          </button>
        </li>
        <li>
          <button data-glow-color="c2" className={styles.b2}>
            <span className="double-icon">
              <FontAwesomeIcon icon={faTableColumns} className="bottom-icon" />
              <FontAwesomeIcon icon={faPlus} className="c2 top-icon" />
            </span>
            <p>new block</p>
          </button>
        </li>
        <li>
          <button data-glow-color="c1" className={styles.b2}>
            <span className="double-icon">
              <FontAwesomeIcon icon={faTableColumns} className="bottom-icon" />
              <FontAwesomeIcon icon={faGears} className="c1 top-icon" />
            </span>
            <p>edit block</p>
          </button>
        </li>
        <li>
          <button data-glow-color="e1" className={styles.b2}>
            <span className="double-icon">
              <FontAwesomeIcon icon={faTableColumns} className="bottom-icon" />
              <FontAwesomeIcon icon={faTrash} className="e1 top-icon" />
            </span>
            <p>delete block</p>
          </button>
        </li>
      </ul>
    </div>
  );
};
export default Toolbar;
