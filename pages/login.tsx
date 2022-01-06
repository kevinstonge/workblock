import { ChangeEvent, FormEvent } from "react";
import { axiosWithAuth } from "../utils/axios";
import { useState } from "react";
import validator from "validator";

const login = () => {
  type FormState = {
    email: string;
    password: string;
    error: string;
  };
  const [formState, setFormState]: [FormState, Function] = useState({
    email: "",
    password: "",
    error: "asdf",
  });
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formState;
    console.log(validator.isEmail(email));
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
    console.log(data);
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
export default login;
