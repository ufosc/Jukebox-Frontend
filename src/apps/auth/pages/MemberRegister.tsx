// export const MemberRegister = () => {
//   return <div>MemberRegister</div>
// }
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {initializeUser, loginUser, selectUserLoggedIn, selectUserStatus} from 'src/store'
import { AuthForm } from '../components/AuthForm'
import './MemberRegister.scss'

export const MemberRegister = () => {
    const userStatus = useSelector(selectUserStatus)
    const userIsLoggedIn = useSelector(selectUserLoggedIn)

    const navigate = useNavigate()
    const handleInitializeUser = () =>
        initializeUser()
  return (
      <div className="registration-page">
          <div className="registration-page__form-container">
              <h2>Register Account</h2>
              <form className="registration-form">
                  {/* Email Field */}
                  <div className="registration-form__field">
                      <label className="registration-form__label" htmlFor="email">
                          Email
                      </label>
                      <input
                          className="registration-form__input"
                          type="email"
                          id="email"
                          name="email"
                          // value={formData.email}
                          // onChange={handleChange}
                          placeholder="Enter your email"
                          required
                      />
                  </div>
                  {/* Name Field */}
                  <div className="registration-form__field">
                      <label className="registration-form__label" htmlFor="name">
                          Name
                      </label>
                      <input
                          className="registration-form__input"
                          type="text"
                          id="name"
                          name="name"
                          // value={formData.name}
                          // onChange={handleChange}
                          placeholder="Enter your name"
                          required
                      />
                  </div>



                  {/* Password Field */}
                  <div className="registration-form__field">
                      <label className="registration-form__label" htmlFor="password">
                          Password
                      </label>
                      <input
                          className="registration-form__input"
                          type="password"
                          id="password"
                          name="password"
                          // value={formData.password}
                          // onChange={handleChange}
                          placeholder="Enter your password"
                          required
                      />
                  </div>

                  {/* Confirm Password Field */}
                  <div className="registration-form__field">
                      <label className="registration-form__label" htmlFor="confirmPassword">
                          Confirm Password
                      </label>
                      <input
                          className="registration-form__input"
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          // value={formData.confirmPassword}
                          // onChange={handleChange}
                          placeholder="Confirm your password"
                          required
                      />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="registration-form__submit">
                      Submit
                  </button>
              </form>
          </div>
      </div>
  )
}
