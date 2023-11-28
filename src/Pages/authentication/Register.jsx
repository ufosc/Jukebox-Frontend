import React, { useRef } from "react";
import AuthForm from "../../Components/AuthForm/AuthForm";
import useApi from "../../hooks/use-api";


export const Register = () => {
  const {register} = useApi();

  const handleRegister = async (e) => {
    register(username, password).then((res) => {
      console.log(res);
    })
  };

  return (
    <div>
      <h1>Register</h1>
      <AuthForm handleSubmit={handleRegister} />
    </div>
  )
};
