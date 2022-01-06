import type { NextPage } from 'next';
import { useContext } from 'react';
import { store } from '../state/store';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import actionTypes from '../state/actionTypes';
const Header: NextPage = () => {
  const { state, dispatch } = useContext(store);
  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userID');
    dispatch({ type: actionTypes.LOGOUT });
    Router.push('/login');
  };

  return (
    <header>
      <h1>WorkBlock!</h1>
      {state.token === undefined ? (
        <nav>
          <Link href="/signup">
            <a>sign up</a>
          </Link>
          <Link href="/login">
            <a>log in</a>
          </Link>
        </nav>
      ) : (
        <nav>
          <a onClick={() => onLogout()}>
            <span>logout</span>
            <span className="smalltext">{state.email}</span>
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
