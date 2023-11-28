import React from 'react'
import AuthForm from 'Components/AuthForm/AuthForm'
import useApi from 'hooks/use-api';

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
