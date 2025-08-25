import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, selectUserLoggedIn, selectUserStatus } from 'src/store'
import { AuthForm } from '../components/AuthForm'
import './Login.scss'

export const Login = () => {
  const userStatus = useSelector(selectUserStatus)
  const userIsLoggedIn = useSelector(selectUserLoggedIn)

  const navigate = useNavigate()

  useEffect(() => {
    if (userStatus === 'succeeded' && userIsLoggedIn) {
      navigate('/dashboard')
    }
  }, [userStatus, userIsLoggedIn])

  return (
    <div className="grid login-page">
      <div className="login-page__form-container">
        <h2>Login</h2>
        <p>You have been logged out.</p>
        <div>
          <AuthForm onSubmit={loginUser} />
        </div>
      </div>
    </div>
  )
}
