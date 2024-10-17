import { type AxiosRequestConfig } from 'axios'
import { REACT_ENV } from 'src/config'
import { httpRequest } from 'src/lib'
import { mockUser } from 'src/mock'
import {
  err,
  NetworkLoginError,
  NotImplementedError,
  ok,
  sleep,
  type Result,
} from 'src/utils'
import { NetworkRoutes } from './routes'
import type { NetworkResponse } from './types'

interface SpotifyLink {
  id: number
  access_token: string
  user_id: number
  spotify_email: string
  expires_in: number
  expires_at: string
  token_type: string
}

interface Jukebox {
  id: number
  name: string
  club_id: number
  spotify_links: SpotifyLink[]
  active_spotify_link?: SpotifyLink
}

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

    const res = await this.sendRequest(this.routes.user.token, 'POST', {
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
        id: Date.now(),
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        image:
          'https://alliancebjjmn.com/wp-content/uploads/2019/07/placeholder-profile-sq-491x407.jpg',
        clubs: mockUser.clubs,
      }
    }
    const res = await this.sendRequest(this.routes.user.details)
    console.log('user res:', res)

    return {
      id: res?.data.id,
      email: res?.data.email,
      firstName: res?.data.first_name,
      lastName: res?.data.last_name,
      image:
        res?.data.image ??
        'https://alliancebjjmn.com/wp-content/uploads/2019/07/placeholder-profile-sq-491x407.jpg',
      clubs: Array.from(res?.data.clubs).map((club: any) => ({
        id: club.id,
        name: String(club.name),
        ownerId: club.owner_id,
      })),
    }
  }

  public async sendGetClubInfo(clubId: number): Promise<IClub> {
    if (this.env === 'dev') {
      throw new NotImplementedError('network.sendGetClubInfo')
    }

    const res = await this.sendRequest(this.routes.club.info(clubId))
    return {
      id: res.data.id,
      name: res.data.name,
      ownerId: res.data.owner_id,
    }
  }

  public async sendGetSpotifyToken(clubId: number): Promise<ISpotifyAuth> {
    if (this.env === 'dev') {
      await sleep(1000)

      return {
        id: 0,
        accessToken: String(import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN),
        userId: 0,
        spotifyEmail: 'user@example.com',
        expiresIn: 3600,
        tokenType: 'Bearer',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).getTime(),
      }
    }

    const res = await this.sendRequest(this.routes.jukebox.list)
    const jukeboxes = res.data as Jukebox[]
    const selectedJbx = jukeboxes.find((jbx) => +jbx.club_id === +clubId)

    // TODO: Handle jukeboxes separately from clubs
    if (!selectedJbx?.active_spotify_link) {
      throw new Error('No spotify connections found.')
    }

    const refreshedRes = await this.sendRequest(
      this.routes.jukebox.activeLink(selectedJbx.id),
    )

    return {
      id: refreshedRes.data?.id,
      accessToken: refreshedRes.data?.access_token,
      userId: refreshedRes.data?.user_id,
      spotifyEmail: refreshedRes.data?.spotify_email,
      expiresIn: refreshedRes.data?.expires_in,
      tokenType: refreshedRes.data?.token_type,
      expiresAt: new Date(refreshedRes.data?.expires_at).getTime(),
    }
  }
}
