import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import { store } from '../state/store';
import Link from 'next/link';
import Router from 'next/router';
import actionTypes from '../state/actionTypes';
const Header: NextPage = () => {
  const {
    token,
    email,
    dispatch,
  }: { token: string | undefined; email: string; dispatch: Function } = useContext(store);
  useEffect(() => {
    if (!token) {
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
  }, [dispatch, token]);
  const onLogout = () => {
    dispatch({ type: actionTypes.LOGOUT });
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userID');
    Router.push('/');
  };

  return (
    <header>
      <Link href="/" passHref>
        <h1>
          <a>WorkBlock!</a>
        </h1>
      </Link>
      {token === '' ? (
        <nav>
          <Link href="/signup" passHref>
            <button data-glow-color="c1">
              <p>sign up</p>
            </button>
          </Link>
          <Link href="/login" passHref>
            <button data-glow-color="c2">
              <p>log in</p>
            </button>
          </Link>
        </nav>
      ) : (
        <nav>
          <button onClick={() => onLogout()} data-glow-color="e1">
            <p>logout</p>
            <p className="smalltext">{email}</p>
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
