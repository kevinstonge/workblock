import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { axiosWithAuth } from "../utils/axios";
import validator from "validator";
import { store } from "../state/store";
import actionTypes from "../state/actionTypes";
import Router from "next/router";

const Login = () => {
  const { dispatch } = useContext(store);
  type FormState = {
    email: string;
    password: string;
    error: string;
  };
  const [formState, setFormState]: [FormState, Function] = useState({
    email: "",
    password: "",
    error: "",
  });
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formState;
    if (!validator.isEmail(email)) {
      setFormState({
        ...formState,
        error: "please provide a valid email",
      });
      return;
    }
    if (password.length < 2) {
      setFormState({
        ...formState,
        error: "please provide a slightly better password",
      });
      return;
    }
    const data = await axiosWithAuth({
      method: "POST",
      url: "/api/login",
      data: { email, password },
    });
    if (data.status === 200) {
      const token: string | undefined = data.data.token;
      if (typeof window !== "undefined" && token) {
        localStorage.setItem("token", token);
        localStorage.setItem("email", formState.email);
        localStorage.setItem("userID", data.data.userID);
      }
      //TODO: populate state with blocks and tasks from login response!
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
          email: formState.email,
          token,
          userID: data.data.userID,
          blocks: data.data.blocks,
          tasks: data.data.tasks,
        },
      });
      Router.push("/");
    } else {
      const error = data.data.message || "error logging in";
      setFormState({ ...formState, error });
    }
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value, error: "" });
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
        {formState.error !== "" && <p className="error">{formState.error}</p>}
        <button type="submit">log in</button>
      </form>
    </>
  );
};
export default Login;
