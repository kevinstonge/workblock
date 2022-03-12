import { NextPage } from "next";
import { useContext, useEffect } from "react";
import actionTypes from "../state/actionTypes";
import { store } from "../state/store";
import { axiosA } from "../utils/axios";
import { Block } from "../utils/types";
interface Props {
  setDeleteConfirmationVisible: Function;
}
const DeleteConfirmation: NextPage<Props> = (props: Props) => {
  const {
    token,
    blocks,
    activeBlockID,
    dispatch,
  }: {
    token: string;
    blocks: Block[];
    activeBlockID: string;
    dispatch: Function;
  } = useContext(store);
  const { setDeleteConfirmationVisible } = props;
  const confirmDelete = async () => {
    console.log("yes");
    const result = await axiosA(token).post("/api/user/updateBlocks", {
      blocks: blocks.filter((b) => b.id !== activeBlockID),
    });
    if (result.status === 200) {
      console.log("success!");
      dispatch({
        type: actionTypes.DELETE_BLOCK,
        payload: activeBlockID,
      });
      setDeleteConfirmationVisible(false);
    } else {
      console.log(`result.status: ${result.status}`);
    }
  };
  useEffect(() => {
    window.addEventListener(
      "click",
      () => {
        setDeleteConfirmationVisible(false);
      },
      false
    );
    return () =>
      window.removeEventListener(
        "click",
        () => {
          setDeleteConfirmationVisible(false);
        },
        false
      );
  }, [setDeleteConfirmationVisible]);
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          confirmDelete();
        }}
      >
        confirm delete
      </button>
    </>
  );
};
export default DeleteConfirmation;
