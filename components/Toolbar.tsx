import type { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowsRotate,
  faTableColumns,
  faPlus,
  faTrash,
  faGears,
} from '@fortawesome/free-solid-svg-icons';
import SelectBlock from './SelectBlock';
import styles from '../styles/Toolbar.module.scss';
import { useState } from 'react';
import BlockEditor from './BlockEditor';
const Toolbar: NextPage = () => {
  const [selectBlockVisible, setSelectBlockVisible] = useState(false);
  const [blockEditor, setBlockEditor] = useState({
    visible: true,
    block: 'new',
  });
  return (
    <>
      <div className={styles.toolbar}>
        {blockEditor.visible && (
          <BlockEditor
            blockEditor={blockEditor}
            setBlockEditor={setBlockEditor}
          />
        )}
        <ul>
          <li>
            <button
              data-glow-color="c1"
              className={styles.b2 + ' ' + styles.dropdownButton}
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
                setBlockEditor({ visible: !blockEditor.visible, block: 'new' });
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
            <button data-glow-color="c1" className={styles.b2}>
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
            <button data-glow-color="e1" className={styles.b2}>
              <span className="double-icon">
                <FontAwesomeIcon
                  icon={faTableColumns}
                  className="bottom-icon"
                />
                <FontAwesomeIcon icon={faTrash} className="e1 top-icon" />
              </span>
              <p>delete</p>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Toolbar;
