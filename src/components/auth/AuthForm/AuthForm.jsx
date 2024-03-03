import React, { useRef } from "react";
import useApi from "../../../hooks/use-api";

import "./AuthForm.css";

export default function AuthForm({ handleSubmit }) {
  const { isLoading, error, online } = useApi();
  const email = useRef("");
  const password = useRef("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    handleSubmit(email, password);
  };

  return (
    <div>
      <div>
        <label for='email'>
          Email
        </label>
        <label for='password'>
          Password
        </label>
        <form action="get" onSubmit={onSubmit}>
          <input type="text" name="email" ref={email} id='email' />
          <input type="text" name="password" ref={password} id='password' />
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <br />
        <hr />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <p>{online ? "Online" : "Offline"}</p>
      </div>
    </div>
  );
}
