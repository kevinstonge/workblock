import { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useContext } from "react";
import { Block } from "../utils/types";
import { store } from "../state/store";
import actionTypes from "../state/actionTypes";
interface Props {
  setSelectBlockVisible: Function;
}
const SelectBlock: NextPage<Props> = (props: Props) => {
  const { setSelectBlockVisible } = props;
  useEffect(() => {
    window.addEventListener(
      "click",
      () => {
        setSelectBlockVisible(false);
      },
      false
    );
    return () =>
      window.removeEventListener(
        "click",
        () => {
          setSelectBlockVisible(false);
        },
        false
      );
  }, [setSelectBlockVisible]);

  const {
    blocks,
    activeBlockID,
    dispatch,
  }: { blocks: Block[]; activeBlockID: string; dispatch: Function } =
    useContext(store);
  return (
    <>
      <h3>
        <span>select block</span>
        <span>
          <FontAwesomeIcon
            icon={faX}
            className="e1 button-icon"
            onClick={() => setSelectBlockVisible(false)}
          />
        </span>
      </h3>
      <ul>
        {blocks.map((b) => (
          <li
            key={`select-block-${b.id}`}
            onClick={() => {
              dispatch({
                type: actionTypes.SET_ACTIVE_BLOCK_ID,
                payload: b.id,
              });
              setSelectBlockVisible(false);
            }}
            data-selected={b.id === activeBlockID ? "selected" : ""}
          >
            {b.title}
          </li>
        ))}
      </ul>
    </>
  );
};
export default SelectBlock;
