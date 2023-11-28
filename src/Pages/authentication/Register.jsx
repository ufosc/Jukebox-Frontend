import React, { useRef } from "react";
import useHttp from "../../hooks/use-http";
import axios from "axios";

export const Register = () => {
  const email = useRef("");
  const password = useRef("");
  const { isLoading, error, sendRequest } = useHttp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let inputEmail = email.current.value;
    let inputPassword = password.current.value;

    console.log(inputEmail);
    console.log(inputPassword);

    let options = {
      url: "http://localhost:8000/api/user/register",
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: {
        username: inputEmail,
        password: inputPassword,
      },
    };

    sendRequest(options, (res) => {
      console.log(res);
    });
  };

  return (
    <form action="get" onSubmit={handleSubmit}>
      <input type="text" name="email" ref={email} />
      <input type="text" name="password" ref={password} />
      <button type="submit">Register</button>
    </form>
  );
};
