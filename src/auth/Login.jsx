import { useApi } from '../hooks'
import { AuthForm } from './AuthForm/AuthForm'

import './authentication.css'

export const Login = () => {
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
