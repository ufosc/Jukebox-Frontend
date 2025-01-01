import { type AxiosRequestConfig } from 'axios'
import { REACT_ENV } from 'src/config'
import { httpRequest } from 'src/lib'
import { mockJukeboxes, mockUser } from 'src/mock'
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

  private parseSpotifyAccount(data: any): ISpotifyAccount {
    return {
      id: +data.id,
      user_id: data.user_id,
      token_type: data.token_type,
      spotify_email: data.spotify_email,
      access_token: data.access_token,
      expires_in: data.expires_in,
      expires_at: new Date(data.expires_at).getTime(),
    }
  }

  private parseJukeboxLink(data: any): IJukeboxLink {
    return {
      id: +data.id,
      type: data.type,
      email: data.email,
      active: data.active,
    }
  }

  private parseJukebox(data: any): IJukebox {
    return {
      id: +data.id,
      club_id: data.club_id,
      links: (data.links ?? []).map((link: any) => this.parseJukeboxLink(link)),
      name: data.name,
    }
  }

  private parseClubMember(data: any): IClubMember {
    return {
      id: +data.id,
      user_id: +data.user_id,
      owner: data.owner,
      role: data.role,
      username: data.username,
      points: data.points,
    }
  }

  private parseClub(data: any): IClub {
    return {
      id: +data.id,
      name: data.name,
      logo: data.logo,
      members: (data.members ?? []).map((member: any) =>
        this.parseClubMember(member),
      ),
    }
  }

  private parseUser(data: any): IUser {
    return {
      id: +data.id,
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      image: data.image,
      clubs: (data.clubs ?? []).map((club: any) => this.parseClub(club)),
    }
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
        // cookie: `csrftoken=${getCookie(CSRF_COOKIE_NAME)}; sessionid=${getCookie(SESSION_COOKIE_NAME)}`,

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

  public sendGetUserInfo = async (): Promise<IUser> => {
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
      }
    }
    const res = await this.sendRequest(this.routes.user.details)
    return this.parseUser(res.data)
  }

  public async sendGetClubInfo(clubId: number): Promise<IClub> {
    if (this.env === 'dev') {
      throw new NotImplementedError('network.sendGetClubInfo')
    }

    const res = await this.sendRequest(this.routes.club.info(clubId))
    return this.parseClub(res.data)
  }

  public async sendGetSpotifyToken(
    jukeboxId: number,
  ): Promise<ISpotifyAccount> {
    if (this.env === 'dev') {
      await sleep(1000)

      return {
        id: 0,
        access_token: String(import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN),
        user_id: 0,
        spotify_email: 'user@example.com',
        expires_in: 3600,
        token_type: 'Bearer',
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24).getTime(),
      }
    }

    const res = await this.sendRequest(
      this.routes.jukebox.refreshSpotifyToken(jukeboxId),
    )

    return this.parseSpotifyAccount(res.data)
  }

  public async sendGetJukeboxes(): Promise<IJukebox[]> {
    if (this.env === 'dev') {
      await sleep(1000)
      return mockJukeboxes
    }

    const res = await this.sendRequest(this.routes.jukebox.list)
    return (res.data ?? []).map((jbx: any) => this.parseJukebox(jbx))
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
      return null
    }

    const res = await this.sendRequest<IPlayerQueueState | null>(
      this.routes.jukebox.playerState(jukeboxId),
    )

    return res.data
  }

  public async sendGetNextTracks(jukeboxId: number): Promise<ITrackMeta[]> {
    if (this.env === 'dev') {
      await sleep(1000)
      return []
    }

    const res = await this.sendRequest<ITrackMeta[]>(
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
