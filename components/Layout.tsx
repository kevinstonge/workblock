import type { NextPage } from "next";
import Header from "./Header";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { ReactNode } from "react";
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
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
