import type { NextPage } from 'next';
import styles from '../styles/CurrentTask.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStopCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const CurrentTask: NextPage = () => {
  const [disabledButtons, setDisabledButtons] = useState({
    play: false,
    pause: true,
    stop: true,
  });
  //
  // what will we know from global state?
  // need to modify my current global state to the following:
  //   if the user has pressed nothing yet:
  //     lastInteractionTimestamp: undefined,
  //     playStatus: "stopped",
  //     disabledButtons: ["stop", "pause"].
  //   if the user has pressed play and lastInteractionTimestamp === undefined:
  //     lastInteractionTimestamp: [[[now]]],
  //     playStatus: "playing",
  //     disabledButtons: ["stop", "play"],
  //   if the user has pressed pause:
  //     lastInteractionTimestamp: [[[now]]],
  //     playStatus: "paused",
  //     disabledButtons: ["pause"]
  //   if the user has pressed stop:
  //     lastInteractionTimestamp: [[[now]]],
  //     playStatus: "stopped",
  //     disabledButtons: ["stop", "pause"]

  // in this component I need to read global state and toggle the disabled attribute on each button component.
  return (
    <div className={styles.currentTask}>
      <div className={styles.currentTaskLeft}>
        <p className={styles.bigTime}>Ti:ME:--</p>
        <div className={styles.currentTaskToolbar}>
          <button data-glow-color="c2" disabled={disabledButtons.play}>
            {/* disable a subset of these buttons depending on play state: if
            playing: disable play and stop if paused: disable pause */}
            <FontAwesomeIcon icon={faPlay} />
            <p>play</p>
          </button>
          <button data-glow-color="c1" disabled={disabledButtons.pause}>
            <FontAwesomeIcon icon={faPause} />
            <p>pause</p>
          </button>
          <button data-glow-color="e1" disabled={disabledButtons.stop}>
            <FontAwesomeIcon icon={faStopCircle} />
            <p>stop</p>
          </button>
        </div>
      </div>
      <div className={styles.currentTaskRight}>
        <h3>task name</h3>
        <p>task description</p>
      </div>
    </div>
  );
};

export default CurrentTask;
