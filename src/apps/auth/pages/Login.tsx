import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  loginUser,
  selectUserError,
  selectUserLoggedIn,
  selectUserStatus,
} from 'src/store'
import { AuthForm } from '../components/AuthForm'
import './Login.scss'

export const Login = () => {
  const userStatus = useSelector(selectUserStatus)
  const userIsLoggedIn = useSelector(selectUserLoggedIn)
  const userError = useSelector(selectUserError)

  const [localError, setLocalError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (userStatus === 'succeeded' && userIsLoggedIn) {
      navigate('/dashboard')
    }
  }, [userStatus, userIsLoggedIn, navigate])

  const handleSubmit = (username: string, password: string) => {
    const invalidChars = /[!@#$%^&*()\s]/
    if (invalidChars.test(username) || invalidChars.test(password)) {
      setLocalError(
        'Username and password cannot contain !@#$%^&*() or spaces.',
      )
      return Promise.resolve({
        success: false,
        error: 'Invalid characters in username or password',
      })
    }

    setLocalError(null)
    return loginUser(username, password)
  }

  return (
    <div className="grid login-page">
      <div className="login-page__form-container">
        <h2>Login</h2>
        <p>You have been logged out.</p>
        <div>
          <AuthForm onSubmit={handleSubmit} />
        </div>

        {localError && (
          <div className="login-page__error">
            <p style={{ color: 'red' }}>{localError}</p>
          </div>
        )}

        {userStatus === 'failed' && userError && !localError && (
          <div className="login-page__error">
            <p style={{ color: 'red' }}>{userError}</p>
          </div>
        )}
      </div>
    </div>
  )
}
