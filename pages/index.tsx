import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import { store } from '../state/store';
import Toolbar from '../components/Toolbar';
import ActiveBlock from '../components/ActiveBlock';
import { axiosWithAuth } from '../utils/axios';

const Home: NextPage = (props) => {
  const { state } = useContext(store);
  useEffect(() => {
    if (state.blocks === undefined && localStorage.getItem('userID')) {
      axiosWithAuth
        .get(`/api/user/${localStorage.getItem('userID')}`)
        .then(console.log)
        .catch(console.log);
    }
  }, [state.token]);
  if (!state.token) {
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
