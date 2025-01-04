import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AuthRegisterForm } from 'src/apps/auth/components/AuthRegisterForm'
import { registerUser, selectUserStatus } from 'src/store'
import './Register.scss'

export const Register = () => {
  const userStatus = useSelector(selectUserStatus)
  const navigate = useNavigate()

  const handleRegisterUser = (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string,
  ) => registerUser(email, firstName, lastName, password, confirmPassword)

  // Issue: userStatus needs an exception to not succeed if on register page
  // useEffect(() => {
  //   if (userStatus === 'succeeded') {
  //     navigate('/auth/admin/login')
  //   }
  // }, [userStatus])

  return (
    <div className="register-page grid">
      <div className="register-page__form-container">
        <h2>Register Account</h2>
        <div className="register-page__form-authcontainer">
          <AuthRegisterForm onSubmit={handleRegisterUser} />
        </div>
      </div>
    </div>
  )
}
