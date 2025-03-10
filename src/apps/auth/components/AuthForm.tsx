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

  const handleGoogleAuth = async () => {
    const form = document.createElement('form')
    form.method = 'POST'
    form.action =
      'http://localhost:8080/api/oauth/browser/v1/auth/provider/redirect'

    const data = {
      provider: 'google',
      callback_url: 'http://localhost:3000/admin',
      process: 'login',
    }

    for (const [key, value] of Object.entries(data)) {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = value
      form.appendChild(input)
    }
    document.body.appendChild(form)
    form.submit()
  }

  return (
    <>
      <Form onSubmit={handleLoginSubmit} className="auth-form">
        <FormSection>
          <FormInputGroup
            label="Email"
            id="email"
            type="text"
            ref={emailRef}
            disabled={userStatus === 'loading'}
            required
            error={errors.email}
            className="auth-form__group"
          />
          <FormInputGroup
            label="Password"
            id="password"
            type="password"
            ref={passwordRef}
            disabled={userStatus === 'loading'}
            required
            error={errors.password}
            className="auth-form__group"
          />
          <div className="auth-form__group">
            {errors.error && (
              <p className="form-feedback error">{errors.error}</p>
            )}
            {userStatus === 'loading' && <p>Loading...</p>}
          </div>
        </FormSection>
        <FormSubmit disabled={userStatus === 'loading'} />
      </Form>
      <button className="button" role="button" onClick={handleGoogleAuth}>
        Sign in with Google
      </button>
    </>
  )
}
