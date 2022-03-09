import type { NextPage } from "next";
import actionTypes from "../state/actionTypes";
import { store } from "../state/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faTableColumns,
  faPlus,
  faTrash,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
import SelectBlock from "./SelectBlock";
import DeleteConfirmation from "./DeleteConfirmation";
import styles from "../styles/Toolbar.module.scss";
import { useContext, useState } from "react";
const Toolbar: NextPage = () => {
  const { dispatch, activeBlockID }: { dispatch: Function, activeBlockID: string } = useContext(store);
  const [selectBlockVisible, setSelectBlockVisible] = useState(false);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

  return (
    <>
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
                <FontAwesomeIcon
                  icon={faTableColumns}
                  className="bottom-icon"
                />
                <FontAwesomeIcon
                  icon={faArrowsRotate}
                  className="c1 top-icon"
                />
              </span>
              <p>select</p>
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
            <button
              data-glow-color="c2"
              className={styles.b2}
              onClick={() => {
                dispatch({ type: actionTypes.CREATE_AND_EDIT_NEW_BLOCK });
              }}
            >
              <span className="double-icon">
                <FontAwesomeIcon
                  icon={faTableColumns}
                  className="bottom-icon"
                />
                <FontAwesomeIcon icon={faPlus} className="c2 top-icon" />
              </span>
              <p>new</p>
            </button>
          </li>
          <li>
            <button
              data-glow-color="c1"
              className={styles.b2}
              onClick={() => {
                dispatch({
                  type: actionTypes.UPDATE_EDITOR,
                  payload: { blockEditor: true, isNewBlock: false },
                });
              }}
            >
              <span className="double-icon">
                <FontAwesomeIcon
                  icon={faTableColumns}
                  className="bottom-icon"
                />
                <FontAwesomeIcon icon={faGears} className="c1 top-icon" />
              </span>
              <p>edit</p>
            </button>
          </li>
          <li>
            <button data-glow-color="e1" className={styles.b2 + " " + styles.dropdownButton} onClick={()=>{
              setDeleteConfirmationVisible(!deleteConfirmationVisible);
            }}>
              <span className="double-icon">
                <FontAwesomeIcon
                  icon={faTableColumns}
                  className="bottom-icon"
                />
                <FontAwesomeIcon icon={faTrash} className="e1 top-icon" />
              </span>
              <p>delete</p>
              {deleteConfirmationVisible && (
                <div
                  className={styles.dropdownContent}
                  onClick={(e) => e.stopPropagation()}
                >
                  <DeleteConfirmation 
                    setDeleteConfirmationVisible={setDeleteConfirmationVisible}
                    blockID={activeBlockID}
                    />
                </div>
              )}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Toolbar;
