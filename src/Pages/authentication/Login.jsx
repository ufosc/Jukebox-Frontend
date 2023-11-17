import React, { useRef } from "react";
import useHttp from "../../hooks/use-http";
import axios from "axios";

const Login = () => {
  const email = useRef("");
  const password = useRef("");
  const { isLoading, error, sendRequest } = useHttp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email.current.value);
    console.log(password.current.value);

    let options = {
      url: "http://localhost:8000/api/user/login",
      method: "POST",
      body: {
        username: email.current.value,
        password: password.current.value,
      },
    };
    
    sendRequest(options, (res) => {
      console.log(res);
    });
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    <form action="get" onSubmit={handleSubmit}>
      <input type="text" name="email" ref={email} />
      <input type="text" name="password" ref={password} />
      <button type="submit">Login</button>
    </form>  
    </div>
    
  );
};

export default Login;
