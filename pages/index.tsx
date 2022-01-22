import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { store } from "../state/store";
import Toolbar from "../components/Toolbar";
import ActiveBlock from "../components/ActiveBlock";
import { axiosWithAuth } from "../utils/axios";
import { Block } from "../utils/types";

const Home: NextPage = (props) => {
  const { blocks, token }: { blocks: Block[]; token: string | undefined } =
    useContext(store);
  useEffect(() => {
    if (blocks === undefined && localStorage.getItem("userID")) {
      axiosWithAuth
        .get(`/api/user/${localStorage.getItem("userID")}`)
        .then(console.log)
        .catch(console.log);
    }
  }, [token]);
  if (!token) {
    return (
      <>
        <Toolbar />
        <ActiveBlock />
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
