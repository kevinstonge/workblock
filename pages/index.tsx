import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { store } from "../state/store";
import Toolbar from "../components/Toolbar";
import ActiveBlock from "../components/ActiveBlock";
import { axiosWithAuth } from "../utils/axios";
import { Block, EditorState } from "../utils/types";
import BlockEditor from "../components/BlockEditor";
import TaskEditor from "../components/TaskEditor";

const Home: NextPage = () => {
  const { editorState }: { editorState: EditorState } = useContext(store);
  const { blocks, token }: { blocks: Block[]; token: string } =
    useContext(store);
  useEffect(() => {
    if (blocks === undefined && localStorage.getItem("userID")) {
      axiosWithAuth
        .get(`/api/user/${localStorage.getItem("userID")}`)
        .then(console.log)
        .catch(console.log);
    }
  }, [token, blocks]);
  if (token !== "") {
    return (
      <>
        <Toolbar />
        <ActiveBlock />
        {editorState?.blockEditor && <BlockEditor />}
        {editorState?.taskEditor && <TaskEditor />}
      </>
    );
  } else {
    return (
      <div>
        <p>not logged in!</p>
      </div>
    );
  }
};

export default Home;
