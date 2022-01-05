import type { NextPage } from 'next';
import Header from './Header';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
const Layout: NextPage = (props) => {
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
      <main className={styles.main}>{props.children}</main>
    </>
  );
};

export default Layout;
