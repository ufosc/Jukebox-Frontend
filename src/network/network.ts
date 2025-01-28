import { AxiosError, type AxiosRequestConfig } from 'axios'
import { REACT_ENV } from 'src/config'
import { httpRequest } from 'src/lib'
import {
  ClubSchema,
  JukeboxSchema,
  SpotifyAccountSchema,
  UserDetailsSchema,
} from 'src/schemas'
import {
  err,
  getRandomSample,
  mockClubs,
  mockJukeboxes,
  mockPlayerQueueState,
  mockTrackMetas,
  mockUser,
  NetworkLoginError,
  ok,
  sleep,
  type Result,
} from 'src/utils'
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

  public sendRequest = async <T = any>(
    url: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: AxiosRequestConfig['data'],
    config?: Omit<AxiosRequestConfig, 'data'>,
  ): Promise<NetworkResponse<T>> => {
    if (this.env === 'test') {
      const res = this.mocks?.mockRequest(body)
      return {
        status: this.mocks?.mockStatus ?? 200,
        description: 'Mock request status',
        data: res,
      }
    }

    if (this.env === 'network') {
      await sleep(1000)
    }

    const res = await httpRequest({
      method: method || 'GET',
      url,
      withCredentials: true,
      headers: {
        Authorization: this.token ? `Token ${this.token}` : '',
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
   * Get token, uses session info if any
   */
  public sendGetUserToken = async () => {
    if (this.env === 'dev') {
      await sleep(1000)
      const token = mockUser.token

      return { success: true, token }
    }
    const res = await this.sendRequest(this.routes.user.token, 'GET')

    if (res.status !== 200 || !res.data.token) {
      return { success: false, error: res.data }
    }

    return { success: true, token: res.data.token as string }
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

    const res = await this.sendRequest(this.routes.user.login, 'POST', {
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

    this.token = res?.data.token
    return ok(String(this.token))
  }

  public sendGetUserInfo = async (): Promise<IUserDetails> => {
    if (this.env === 'dev') {
      await sleep(1000)
      return {
        id: Date.now(),
        email: mockUser.email,
        username: mockUser.username,
        first_name: mockUser.first_name,
        last_name: mockUser.last_name,
        image:
          'https://alliancebjjmn.com/wp-content/uploads/2019/07/placeholder-profile-sq-491x407.jpg',
        clubs: mockUser.clubs,
        created_at: mockUser.created_at,
        updated_at: mockUser.updated_at,
      }
    }
    const res = await this.sendRequest(this.routes.user.details)
    return UserDetailsSchema.parse(res.data)
  }

  public async sendGetClubs(): Promise<IClub[]> {
    if (this.env === 'dev') {
      await sleep(1000)
      return mockClubs
    }

    const res = await this.sendRequest(this.routes.club.list)
    console.log('clubs res:', res)
    const clubs = []

    for (const club of res.data) {
      console.log('club:', club)
      clubs.push(ClubSchema.parse(club))
    }

    // const clubs = res.data.map((obj: any) => ClubSchema.parse(obj))
    // console.log('clubs returned:', clubs)
    return clubs
  }

  public async sendGetClubInfo(clubId: number): Promise<IClub> {
    if (this.env === 'dev') {
      await sleep(1000)
      const club = mockClubs.find((club) => club.id === clubId)
      if (!club) {
        throw new AxiosError(`Club with id ${clubId} not found.`, '404')
      }

      return club
    }

    const res = await this.sendRequest(this.routes.club.info(clubId))
    return ClubSchema.parse(res.data)
  }

  public async sendGetSpotifyToken(
    jukeboxId: number,
  ): Promise<ISpotifyAccount> {
    if (this.env === 'dev') {
      await sleep(1000)

      return {
        id: 0,
        access_token: String(import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN ?? ''),
        refresh_token: '',
        user_id: 0,
        spotify_email: 'user@example.com',
        expires_in: 3600,
        token_type: 'Bearer',
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }

    const res = await this.sendRequest(
      this.routes.jukebox.refreshSpotifyToken(jukeboxId),
    )

    return SpotifyAccountSchema.parse(res.data)
  }

  public async sendGetJukeboxes(): Promise<IJukebox[]> {
    if (this.env === 'dev') {
      await sleep(1000)
      return mockJukeboxes
    }

    const res = await this.sendRequest(this.routes.jukebox.list)
    return (res.data || []).map((jbx: any) => JukeboxSchema.parse(jbx))
  }

  public async connectSpotifyDevice(jukeboxId: number, deviceId: string) {
    if (this.env === 'dev') {
      await sleep(1000)
      return
    }

    await this.sendRequest(
      this.routes.jukebox.connectDevice(jukeboxId),
      'POST',
      { device_id: deviceId },
    )
  }

  public async sendUpdateActiveLink(jukeboxId: number, link: IJukeboxLink) {
    if (this.env === 'dev') {
      await sleep(1000)
      return
    }

    await this.sendRequest(this.routes.jukebox.activeLink(jukeboxId), 'POST', {
      type: link.type,
      email: link.email,
    })
  }

  public async sendGetCurrentlyPlaying(
    jukeboxId: number,
  ): Promise<IPlayerQueueState | null> {
    if (this.env === 'dev') {
      await sleep(1000)
      return mockPlayerQueueState
    }

    const res = await this.sendRequest<IPlayerQueueState | null>(
      this.routes.jukebox.playerState(jukeboxId),
    )

    return res.data
  }

  public async sendGetNextTracks(jukeboxId: number): Promise<IQueuedTrack[]> {
    if (this.env === 'dev') {
      await sleep(1000)
      return getRandomSample(mockTrackMetas)
    }

    const res = await this.sendRequest<IQueuedTrack[]>(
      this.routes.jukebox.nextTracks(jukeboxId),
    )

    return res.data
  }

  public async sendClearNextTracks(jukeboxId: number) {
    if (this.env === 'dev') {
      await sleep(1000)
      return
    }

    await this.sendRequest(this.routes.jukebox.nextTracks(jukeboxId), 'DELETE')
  }
}
