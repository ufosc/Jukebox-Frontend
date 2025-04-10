import type { AxiosRequestConfig } from 'axios'
import { CURRENT_URL, REACT_ENV } from 'src/config'
import { httpRequest, logger } from 'src/lib'
import { UserTokenSchema } from 'src/schemas'
import { localDataFactory, NotImplementedError, sleep } from 'src/utils'
import { ZodError } from 'zod'
import { NetworkEndpoints } from './endpoints'

const MOCK_DELAY_MS = 1000

export type NetworkSuccess<T> = T
export type NetworkError<T> =
  | { nested?: false; error: string; errors?: never }
  | {
      nested: true
      error?: never
      errors: Record<keyof T, string>
    }

export type NetworkResponse<T> =
  | { success: true; data: NetworkSuccess<T>; status?: number }
  | { success: false; data: NetworkError<T>; status?: number }

/**
 * Base functionality for the network interface,
 * independent of feature-specific requirements.
 *
 * Terminology & request methods:
 * - create: POST
 * - list: GET
 * - get: GET<id>
 * - update: PUT<id>
 * - delete: DELETE<id>
 */
export class NetworkBase {
  protected endpoints = NetworkEndpoints
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

  /*=== Authentication ====================================*/
  /**
   * Readonly accessor for auth token.
   */
  protected get token() {
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
   * Creates a new dynamic form, creates hidden fields for each of the
   * required fields to submit to the server, and submits the form to
   * the server. This allows the post request to redirect the user
   * to the server, which will redirect to the consent screen.
   */

  public async loginWithOauth(provider: 'google', returnPath: string) {
    const form = document.createElement('form')
    form.method = 'POST'

    switch (provider) {
      case 'google':
        form.action = this.endpoints.user.oauth.google
        break
      default:
        throw new NotImplementedError(`Provider ${provider} is not setup.`)
    }

    const data = {
      provider,
      callback_url: CURRENT_URL + returnPath,
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

    // If in dev mode, just redirect to callback url
    if (REACT_ENV === 'dev') {
      window.location.href = data.callback_url
    } else {
      form.submit()
    }
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

    const res = await this.request(url, UserTokenSchema, {
      isPublic: true,
      mock: { data: { token: 'test-token' } },
    })

    if (!res.success) return res
    this.setToken(res.data.token)

    return res
  }

  /**
   * Initiate standard auth flow.
   *
   * Sends a request to the server which returns a user
   * token. This token will be sent with each api request.
   */
  public async loginWithUsername(usernameOrEmail: string, password: string) {
    const url = this.endpoints.user.login

    const res = await this.request(url, UserTokenSchema, {
      method: 'POST',
      data: { username: usernameOrEmail, password },
      isPublic: true,
      mock: { data: { token: 'test-token' } },
    })

    if (!res.success) return res
    this.setToken(res.data.token)

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

  /*=== Utilities =========================================*/
  /**
   * Send an API request to the network,
   * and validate the response using a provided
   * schema. If in dev mode, will return any
   * mock data provided.
   */
  protected async request<T = unknown>(
    url: string,
    schema?: Zod.Schema<T> | null,
    config?: AxiosRequestConfig & {
      mock?: {
        data: T
        errorIfEmpty?: boolean
      }
      // mockData?: T
      isPublic?: boolean
    },
  ): Promise<NetworkResponse<T>> {
    const {
      mock = undefined,
      headers = {},
      method = 'GET',
      isPublic = false,
      ...axiosConfig
    } = config ?? {}

    if (REACT_ENV === 'dev' && mock) {
      await sleep(MOCK_DELAY_MS) // Simulate server delay

      if (mock.data == null && mock.errorIfEmpty) {
        return {
          success: false,
          status: 404,
          data: {
            error: 'Object not found.',
          },
        }
      }

      return {
        success: true,
        status: 200,
        data: mock.data,
      }
    } else if (REACT_ENV === 'network') {
      await sleep(MOCK_DELAY_MS) // Simulate network delay
    }

    if (!isPublic && this.isAuthenticated) {
      // Private route, is authenticated
      headers['Authorization'] = `Token ${this.token}`
    } else if (!isPublic) {
      // Private route, not authenticated, don't even try request
      return {
        success: false,
        status: 401,
        data: { error: 'User is not authenticated' },
      }
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json'

    const response: NetworkResponse<T> = await httpRequest({
      url,
      withCredentials: true,
      method,
      headers,
      timeout: 100000,
      ...axiosConfig,
    })
      // Validate data using schema
      .then((res): T => {
        logger.debug('Network request:', res)
        if (schema != null) {
          return res.data
        } else {
          return res.data
        }
      })
      // Provide success response
      .then((data) => ({ success: true, data: data }) as const)
      // Handle error responses
      .catch((error: any | ZodError<T>) => {
        logger.warn('Error from network:', error)

        const errorDefaults = {
          success: false,
          status: 500,
        } as const

        if (error instanceof ZodError && schema) {
          console.warn(
            `API returned incorrect response for ${schema._type}, errors:`,
            error,
          )
          return {
            ...errorDefaults,
            data: { error: 'Received incorrect response' },
          }
        } else if (error.response) {
          const errorResDefaults = {
            ...errorDefaults,
            status: error.response.status ?? errorDefaults.status,
          }
          if (error.response.data instanceof Object) {
            return {
              ...errorResDefaults,
              data: {
                nested: true,
                errors: error.response.data,
              },
            }
          } else {
            return {
              ...errorResDefaults,
              data: {
                nested: false,
                error: error.response.data,
              },
            }
          }
        } else {
          return {
            ...errorDefaults,
            data: {
              error: error.message ?? 'Unknown error',
            },
          }
        }
      })

    return response
  }
}
