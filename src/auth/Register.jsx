import { useApi } from '../hooks'
import { AuthForm } from './AuthForm/AuthForm'

export const Register = () => {
  const { register } = useApi()

  const handleRegister = async (username, password) => {
    register(username, password).then((res) => {
      console.log(res)
    })
  }

  return (
    <div>
      <h1>Register</h1>
      <AuthForm handleSubmit={handleRegister} />
    </div>
  )
}
