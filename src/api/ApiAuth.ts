import { UserTokenSchema } from 'src/schemas'
import { localDataFactory } from 'src/utils'
import { ApiBase } from './ApiBase'

export type OAuthProvider = 'google' | 'github'
export interface TokenResponse {
  token: string
}

/**
 * Sub section of the api that specifically handles authentication.
 */
export class ApiAuth extends ApiBase {
  private _token: string | null = null
  private tokenFactory = localDataFactory<string>('jukebox-token')

  protected constructor() {
    super()
    this._token = this.tokenFactory.get()
  }

  protected setToken(token: string) {
    this.tokenFactory.set(token)
    this._token = token
  }

  protected clearToken() {
    this._token = null
    return this.tokenFactory.clear()
  }

  /**
   * Readonly accessor for auth token.
   */
  public get token() {
    return this._token
  }

  /**
   * Checks if a user token exists
   */
  public get isAuthenticated() {
    return this._token != null && this._token.trim().length > 1
  }

  /**
   * Initiate the oauth flow.
   *
   * Redirects the user to the OAuth provider's consent screen.
   *
   * Creates a new dynamic form, creates hidden fields for each of the
   * required fields to submit to the server, and submits the form to
   * the server. This allows the post request to redirect the user
   * to the server, which will redirect to the consent screen.
   *
   * On return from the server, the user's token will be provided in
   * the url with the "token" query param.
   */
  async loginWithOauth(
    provider: OAuthProvider,
    options: {
      returnPath?: string
      process?: 'login' | 'connect'
      token?: string
    },
  ) {
    if (this.env === 'dev') return

    const returnPath = options.returnPath ?? ''
    const process = options.process ?? 'login'

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = this.endpoints.user.oauthRedirect

    if (options.token) {
      form.action += '?token=' + options.token
    }

    const callbackUrl = new URL(returnPath, window.location.href)

    const data = {
      provider: provider,
      callback_url: callbackUrl.href,
      process,
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

  /**
   * Handle return request from oauth.
   *
   * The server returns with a new session id stored as a cookie.
   * This session id allows us to authenticate with the server
   * and obtain a user token to use with the REST API.
   */
  public async handleOauthReturn() {
    const url = this.endpoints.user.token

    const res = await this.get(url, {
      schema: UserTokenSchema,
      isPublic: true,
      mock: { data: { token: 'test-token' } },
    })

    if (res.success) {
      this.setToken(res.data.token)
    }

    return res
  }

  /**
   * Initiate standard auth flow.
   *
   * Sends a request to the server which returns a user
   * token if successful. This function does not handle storage of this token.
   */
  async loginWithUsername(usernameOrEmail: string, password: string) {
    const url = this.endpoints.user.token

    function getCsrfTokenFromCookie(): string | null {
      const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='));

      return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
    }

    const res = await this.post<TokenResponse>(url, {
      body: { username: usernameOrEmail, password },
      isPublic: true,
      mock: { data: { token: 'test-token' } },
    })

    if (res.success) {
      this.setToken(res.data.token)
    }

    return res
  }

  /**
   * Clear user auth tokens, end any sessions, remove
   * any auth cookies.
   */
  public async logout() {
    if (!this.isAuthenticated) return

    this.clearToken()
  }
}
