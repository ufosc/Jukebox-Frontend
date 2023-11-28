import React, { useRef } from "react";
import useApi from "hooks/use-api";

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
        
        <form action="get" onSubmit={onSubmit}>
          <input type="text" name="email" ref={email} />
          <input type="text" name="password" ref={password} />
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
