import { localDataFactory } from 'src/utils'

export class NetworkAuth {
  private _token: string | null = null
  private tokenFactory = localDataFactory<string>('clubportal-token')

  constructor() {
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
  get token() {
    return this._token
  }
  /*=== Authentication ====================================*/
  /**
   * Initiate the oauth flow.
   *
   * Creates a new dynamic form, creates hidden fields
   * for each of the required fields to submit to the
   * server, and submits the form to the server. This
   * allows the post request to redirect to the server,
   * and redirect to the consent screen.
   */

  public async loginWithOauth(provider: 'google') {}

  /**
   * Handle return request from oauth.
   *
   * The server returns with a new session stored
   * as a cookie. This allows us to authenticate with
   * the server and obtain a user token.
   */
  public async handleOauthCallback() {}

  /**
   * Initiate standard auth flow.
   *
   * Sends a request to the server which returns a user
   * token. This token will be sent with each api request.
   */
  public async loginWithUsername(usernameOrEmail: string, password: string) {}
}
