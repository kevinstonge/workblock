import type { NextPage } from "next";
import Header from "./Header";
import Head from "next/head";
import { store } from "../state/store";
import { ReactNode, useContext } from "react";
import TaskEditor from "./TaskEditor";
import BlockEditor from "./BlockEditor";
import { EditorState } from "../utils/types";
type Props = {
  children?: ReactNode;
};
const Layout: NextPage = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>WorkBlock</title>
        <meta
          name="description"
          content="create schedules to block out your workday with WorkBlock!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </>
  );
};

export default Layout;
