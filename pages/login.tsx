import { ChangeEvent, FormEvent } from 'react';
import { axiosWithAuth } from '../utils/axios';
import { useState } from 'react';
import validator from 'validator';
import { useContext } from 'react';
import { store } from '../state/store';
import actionTypes from '../state/actionTypes';
import { useRouter } from 'next/router';

const login = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(store);
  type FormState = {
    email: string;
    password: string;
    error: string;
  };
  const [formState, setFormState]: [FormState, Function] = useState({
    email: '',
    password: '',
    error: 'asdf',
  });
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formState;
    if (!validator.isEmail(email)) {
      setFormState({
        ...formState,
        error: 'please provide a valid email',
      });
      return;
    }
    if (password.length < 2) {
      setFormState({
        ...formState,
        error: 'please provide a slightly better password',
      });
      return;
    }
    const data = await axiosWithAuth({
      method: 'POST',
      url: '/api/login',
      data: { email, password },
    });
    const token: string | undefined = data.data.token;
    if (typeof window !== 'undefined' && token) {
      localStorage.setItem('token', token);
      localStorage.setItem('email', formState.email);
      localStorage.setItem('userID', data.data.userID);
    }
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
        email: formState.email,
        token,
        userID: data.data.userID,
      },
    });
    // redirect from here!
    router.push('/');
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value, error: '' });
  };
  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <h2>Log In</h2>
        <label htmlFor="email">
          <p>email: </p>
          <input
            type="email"
            autoComplete="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={(e) => onChange(e)}
          ></input>
        </label>
        <label htmlFor="password">
          <p>password: </p>
          <input
            type="password"
            autoComplete="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={(e) => onChange(e)}
          ></input>
        </label>
        {formState.error !== '' && <p className="error">{formState.error}</p>}
        <button type="submit">log in</button>
      </form>
    </>
  );
};
export default login;
