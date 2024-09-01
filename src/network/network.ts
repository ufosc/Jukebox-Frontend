import { type AxiosRequestConfig } from 'axios'
import { REACT_ENV } from 'src/config'
import { httpRequest } from 'src/lib'
import { mockUser } from 'src/mock'
import { err, NetworkLoginError, ok, sleep, type Result } from 'src/utils'
import { NetworkRoutes } from './routes'
import type { NetworkResponse } from './types'

export class Network {
  static instance: Network
  protected routes: typeof NetworkRoutes
  private token: string | null
  public env: nodenv
  protected mocks?: {
    mockStatus?: number
    mockRequest: (payload: any) => any
  }

  private constructor() {
    this.env = REACT_ENV
    this.routes = NetworkRoutes
    this.token = null
  }

  public static getInstance = (): Network => {
    if (!Network.instance) {
      Network.instance = new Network()
    }

    return Network.instance
  }
  public static setMocks = (mocks: Network['mocks']) => {
    const instance = this.getInstance()
    instance.mocks = mocks
  }

  public static setMockRes = (cb: (...data: any[]) => any) => {
    const instance = this.getInstance()
    instance.mocks = { ...instance?.mocks, mockRequest: cb }

    return cb
  }

  public sendRequest = async (
    url: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: AxiosRequestConfig['data'],
    config?: Omit<AxiosRequestConfig, 'data'>,
  ): Promise<NetworkResponse> => {
    if (this.env === 'test') {
      const res = this.mocks?.mockRequest(body)
      return {
        status: this.mocks?.mockStatus ?? 200,
        description: 'Mock request status',
        data: res,
      }
    }

    if (this.env === 'network' || this.env === 'dev') {
      await sleep(1000)
    }

    const res = await httpRequest({
      method: method || 'GET',
      url,
      headers: {
        Authorization: `Token ${this.token}`,
        'Content-Type': 'application/json',

        ...config?.headers,
      },
      data: body,
      ...config,
    }).catch((error) => {
      console.log('caught error:', error)
      return error.response
    })

    return {
      status: res.status,
      description: res.statusText,
      data: res.data,
    }
  }

  public setToken = (token: string) => {
    this.token = token
  }

  /**
   * Login user and return token.
   */
  public sendLoginUser = async (
    email: string,
    password: string,
  ): Promise<Result<string, NetworkLoginError>> => {
    if (this.env === 'dev') {
      await sleep(1000)
      const token = mockUser.token

      return ok(token)
    }

    const res = await this.sendRequest(NetworkRoutes.user.token, 'POST', {
      email,
      password,
    })

    if (res.status !== 200 || !res.data.token) {
      console.log('network error message:', res.data.email)

      return err(
        new NetworkLoginError(
          res.data?.nonFieldErrors ?? res.description,
          res.data?.email,
          res.data?.password,
        ),
      )
    }

    console.log('token res:', res)
    this.token = res?.data.token

    return ok(String(res?.data.token))
  }

  public sendGetUserInfo = async (): Promise<IUser> => {
    if (this.env === 'dev') {
      await sleep(1000)
      return {
        id: Date.now().toString(),
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        image:
          'https://alliancebjjmn.com/wp-content/uploads/2019/07/placeholder-profile-sq-491x407.jpg',
      }
    }
    const res = await this.sendRequest(NetworkRoutes.user.details)

    return {
      id: res?.data.id,
      email: res?.data.email,
      firstName: res?.data.firstName,
      lastName: res?.data.lastName,
      image:
        res?.data.image ??
        'https://alliancebjjmn.com/wp-content/uploads/2019/07/placeholder-profile-sq-491x407.jpg',
    }
  }
}
