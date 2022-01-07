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
const Toolbar: NextPage = () => {
  return (
    <div className={styles.toolbar}>
      <ul>
        <li>
          <button data-glow-color="c1" className={styles.b2 + ' ' + styles.dropdown}>
            <span className="double-icon">
              <FontAwesomeIcon
                icon={faArrowsRotate}
                className="c1 top-icon"
              />
              <FontAwesomeIcon icon={faTableColumns} className="bottom-icon" />
            </span>
            <p>select block</p>
            <div className={styles.dropdownContent + `${true ? styles.visible : ''}`}>
              <SelectBlock />
            </div>
          </button>
        </li>
        <li>
          <button data-glow-color="c2" className={styles.b2}>
            <span className="double-icon">
              <FontAwesomeIcon
                icon={faPlus}
                className="c2 top-icon"
              />
              <FontAwesomeIcon icon={faTableColumns} className="bottom-icon" />
            </span>
            <p>new block</p>
          </button>
        </li>
        <li>
          <button data-glow-color="c1" className={styles.b2}>
            <span className="double-icon">
              <FontAwesomeIcon
                icon={faGears}
                className="c1 top-icon"
              />
              <FontAwesomeIcon icon={faTableColumns} className="bottom-icon" />
            </span>
            <p>edit block</p>
          </button>
        </li>
        <li>
          <button data-glow-color="e1" className={styles.b2}>
            <span className="double-icon">
              <FontAwesomeIcon
                icon={faTrash}
                className="e1 top-icon"
              />
              <FontAwesomeIcon icon={faTableColumns} className="bottom-icon" />
            </span>
            <p>delete block</p>
          </button>
        </li>
      </ul>
    </div>
  );
};
export default Toolbar;
