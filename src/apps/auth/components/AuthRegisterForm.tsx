import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Form, FormInputGroup, FormSection, FormSubmit } from 'src/components'
import { selectUserStatus } from 'src/store'

export const AuthRegisterForm = (props: {
  onSubmit: (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string,
  ) => Promise<
    | ({
        success: true
      } & { [key: string]: any })
    | {
        success: false
        emailError?: string
        firstNameError?: string
        lastNameError?: string
        passwordError?: string
        confirmPasswordError?: string
        error?: string
      }
  >
}) => {
  const { onSubmit } = props
  const [errors, setErrors] = useState<{
    error?: string
    email?: string
    firstName?: string
    lastName?: string
    password?: string
    confirmPassword?: string
  }>({})

  const userStatus = useSelector(selectUserStatus)

  // Register form refs
  const emailRef = useRef<HTMLInputElement>(null)
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const handleRegisterSubmit = () => {
    const email = emailRef.current?.value || ''
    const firstName = firstNameRef.current?.value || ''
    const lastName = lastNameRef.current?.value || ''
    const password = passwordRef.current?.value || ''
    const confirmPassword = confirmPasswordRef.current?.value || ''

    onSubmit(email, firstName, lastName, password, confirmPassword).then(
      (res) => {
        if (!res.success) {
          setErrors({
            error: res.error,
            email: res.emailError,
            firstName: res.firstNameError,
            lastName: res.lastNameError,
            password: res.passwordError,
            confirmPassword: res.confirmPasswordError,
          })
        }
      },
    )
  }

  return (
    <Form onSubmit={handleRegisterSubmit}>
      <FormSection>
        <FormInputGroup
          label="Email"
          id="email"
          type="text"
          ref={emailRef}
          disabled={userStatus === 'loading'}
          required
          error={errors.email}
        />
        <div className="form-row">
          <FormInputGroup
            label="First Name"
            id="firstName"
            type="text"
            ref={firstNameRef}
            disabled={userStatus === 'loading'}
            required
            error={errors.firstName}
          />

          <FormInputGroup
            label="Last Name"
            id="lastName"
            type="text"
            ref={lastNameRef}
            disabled={userStatus === 'loading'}
            required
            error={errors.lastName}
          />
        </div>
        <FormInputGroup
          label="Password"
          id="password"
          type="password"
          ref={passwordRef}
          disabled={userStatus === 'loading'}
          required
          error={errors.password}
        />
        <FormInputGroup
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          ref={confirmPasswordRef}
          disabled={userStatus === 'loading'}
          required
          error={errors.confirmPassword}
        />
        <div>
          {errors.error && (
            <p className="form-feedback error">{errors.error}</p>
          )}
          {userStatus === 'loading' && <p>Loading...</p>}
        </div>
      </FormSection>
      <FormSubmit disabled={userStatus === 'loading'} />
    </Form>
  )
}
