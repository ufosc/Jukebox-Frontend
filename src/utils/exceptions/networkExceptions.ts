export class NetworkError extends Error {
  constructor(message?: string) {
    super(message || 'Unexpected error.')
    this.name = 'NetworkError'
  }
}

export class NetworkLoginError extends Error {
  emailError: string | undefined
  passwordError: string | undefined
  constructor(message?: string, emailError?: string, passwordError?: string) {
    super(message)

    this.emailError = emailError
    this.passwordError = passwordError
  }
}
