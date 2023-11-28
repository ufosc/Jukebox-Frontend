import React from 'react'

import useApi from '../../hooks/use-api';
import AuthForm from '../../Components/AuthForm/AuthForm';


export default function Login() {
  const { login } = useApi();
  
  const handleLogin = (username, password) => {
    login(username, password).then((res) => {
      console.log(res);
    })
  };
  
  return (
    <div>
      <h1>Login</h1>
      <AuthForm handleSubmit={handleLogin} />
    </div>
  )
}
