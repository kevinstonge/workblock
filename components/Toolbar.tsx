import type { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowsRotate,
  faTableColumns,
  faPlus,
  faTrash,
  faGears,
} from '@fortawesome/free-solid-svg-icons';
const Toolbar: NextPage = () => {
  return (
    <div className="toolbar">
      <ul>
        <li>
          <button id="select-block" data-color-style="neutral">
            <span className="double-icon">
              <FontAwesomeIcon
                icon={faArrowsRotate}
                className="color-neutral top-icon"
              />
              <FontAwesomeIcon icon={faTableColumns} className="bottom-icon" />
            </span>
            <p>select block</p>
          </button>
        </li>
        <li>
          <button id="new-block" data-color-style="positive">
            <span className="double-icon">
              <FontAwesomeIcon
                icon={faPlus}
                className="color-positive top-icon"
              />
              <FontAwesomeIcon icon={faTableColumns} className="bottom-icon" />
            </span>
            <p>new block</p>
          </button>
        </li>
        <li>
          <button id="edit-block" data-color-style="neutral">
            <span className="double-icon">
              <FontAwesomeIcon
                icon={faGears}
                className="color-neutral top-icon"
              />
              <FontAwesomeIcon icon={faTableColumns} className="bottom-icon" />
            </span>
            <p>edit block</p>
          </button>
        </li>
        <li>
          <button id="delete-block" data-color-style="negative">
            <span className="double-icon">
              <FontAwesomeIcon
                icon={faTrash}
                className="color-negative top-icon"
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
