import type { NextPage } from 'next';
import { useContext } from 'react';
import { store } from '../state/store';
import Link from 'next/link';
const Header: NextPage = () => {
  const { state, dispatch } = useContext(store);
  console.log(state.username);
  return (
    <header>
      <h1>WorkBlock!</h1>
      {state.username === '' ? (
        <nav>
          <Link href="/signup">
            <a>sign up</a>
          </Link>
          <Link href="/login">
            <a>log in</a>
          </Link>
        </nav>
      ) : (
        <a>logout</a>
      )}
    </header>
  );
};

export default Header;
