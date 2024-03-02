import React from 'react'

import AuthForm from '../../components/auth/AuthForm/AuthForm'
import useApi from '../../hooks/use-api'

import './authentication.css'

export default function Login() {
  const { login } = useApi()

  const handleLogin = (username, password) => {
    login(username, password).then((res) => {
      console.log(res)
    })
  }

  return (
    <div>
      <h1 className="header">Login</h1>
      <AuthForm handleSubmit={handleLogin} />
    </div>
  )
}
