import type { NextPage } from 'next';
import { useContext } from 'react';
import { store } from '../state/store';
import Toolbar from '../components/Toolbar';
import ActiveBlock from '../components/ActiveBlock';

const Home: NextPage = (props) => {
  const { state } = useContext(store);
  if (state.token) {
    return (
      <>
        <Toolbar />
        <ActiveBlock />
      </>
    );
  } else {
    return <p>not logged in!</p>;
  }
};

export default Home;
