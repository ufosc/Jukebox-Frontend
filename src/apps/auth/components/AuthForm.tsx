import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Form, FormInputGroup, FormSection, FormSubmit } from 'src/components'
import { selectUserStatus } from 'src/store'

export const AuthForm = (props: {
  onSubmit: (
    email: string,
    password: string,
  ) => Promise<
    | ({
        success: true
      } & {
        [key: string]: any
      })
    | {
        success: false
        emailError?: string
        passwordError?: string
        error?: string
      }
  >
}) => {
  const { onSubmit } = props
  const [errors, setErrors] = useState<{
    error?: string
    email?: string
    password?: string
  }>({
    error: undefined,
    email: undefined,
    password: undefined,
  })

  const userStatus = useSelector(selectUserStatus)

  // Login form refs
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleLoginSubmit = () => {
    const email = emailRef.current?.value || ''
    const password = passwordRef.current?.value || ''

    onSubmit(email, password).then((res) => {
      if (!res.success) {
        setErrors({
          error: res.error,
          email: res.emailError,
          password: res.passwordError,
        })
      }
    })
  }

  useEffect(() => {
    console.log('new auth errors:', errors)
  }, [errors])

  return (
    <Form onSubmit={handleLoginSubmit}>
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
        <FormInputGroup
          label="Password"
          id="password"
          type="password"
          ref={passwordRef}
          disabled={userStatus === 'loading'}
          required
          error={errors.password}
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
