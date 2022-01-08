import { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
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
        <li>block title 1 [block duration]</li>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
      </ul>
    </>
  );
};
export default SelectBlock;
