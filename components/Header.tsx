import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import { store } from '../state/store';
import Link from 'next/link';
import Router from 'next/router';
import actionTypes from '../state/actionTypes';
const Header: NextPage = () => {
  const { state, dispatch } = useContext(store);
  useEffect(() => {
    if (!state.token) {
      const lsToken = localStorage.getItem('token') || undefined;
      if (lsToken) {
        dispatch({
          type: actionTypes.NEW_SESSION,
          payload: {
            email: localStorage.getItem('email'),
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userID'),
          },
        });
      }
    }
  }, []);
  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userID');
    dispatch({ type: actionTypes.LOGOUT });
    Router.push('/');
  };

  return (
    <header>
      <Link href="/">
        <h1>
          <a>WorkBlock!</a>
        </h1>
      </Link>
      {state.token === undefined ? (
        <nav>
          <Link href="/signup">
            <button data-glow-color="c1">
              <p>sign up</p>
            </button>
          </Link>
          <Link href="/login">
            <button data-glow-color="c2">
              <p>log in</p>
            </button>
          </Link>
        </nav>
      ) : (
        <nav>
          <button onClick={() => onLogout()} data-glow-color="e1">
            <p>logout</p>
            <p className="smalltext">{state.email}</p>
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
