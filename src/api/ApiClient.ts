import {
  ClubListSchema,
  ClubMembershipListSchema,
  ClubSchema,
  JukeboxListSchema,
  SpotifyAccountSchema,
  SpotifyAuthRedirectUrlSchema,
  UserSchema,
} from 'src/schemas'
import {
  MockClubs,
  mockJukeboxes,
  mockSpotifyAccount,
  MockUser,
} from 'src/utils'
import { mockMemberships } from 'src/utils/mock/mock-memberships'
import { mockPlayerQueueState } from '../utils/mock/mock-spotify'
import { ApiAuth } from './ApiAuth'

/**
 * Handle API requests to connected servers.
 */
export class ApiClient extends ApiAuth {
  protected static instance: ApiClient

  public static getInstance() {
    if (!this.instance) {
      this.instance = new this()
    }

    return this.instance
  }

  // ======================================
  // User & Club Routes
  // ======================================
  /**
   * Fetch details for logged in user.
   */
  public async getMe() {
    const url = this.endpoints.user.info

    return await this.get(url, {
      schema: UserSchema,
      mock: { data: MockUser },
    })
  }

  /**
   * Fetch a list of clubs user is member of.
   */
  public async listClubs() {
    const url = this.endpoints.club.list

    return await this.get(url, {
      schema: ClubListSchema,
      mock: { data: MockClubs },
    })
  }

  /**
   * Fetch details for a club.
   */
  public async getClub(id: number) {
    const url = this.endpoints.club.detail(id)

    return await this.get(url, {
      schema: ClubSchema,
      mock: {
        data: MockClubs.find((club) => club.id === id) ?? null,
        errorIfEmpty: true,
      },
    })
  }

  /**
   * Get club members.
   */
  public async getClubMembers(clubId: number) {
    const url = this.endpoints.club.memberList(clubId)

    return await this.get<IClubMembership[]>(url, {
      schema: ClubMembershipListSchema,
    })
  }

  /**
   * Get club memberships for the current user.
   */
  public async getMyClubMemberships() {
    const url = this.endpoints.club.membershipList

    return await this.get(url, {
      schema: ClubMembershipListSchema,
      mock: { data: mockMemberships },
    })
  }

  // ======================================
  // Jukebox Routes
  // ======================================

  /**
   * CRUD routes for jukeboxes.
   */
  readonly jukeboxes = this.resourceFactory<
    IJukebox,
    IJukeboxCreate,
    IJukeboxUpdate
  >(this.endpoints.jukebox.list)

  /**
   * Standard CRUD routes for juke sessions.
   */
  readonly jukeSessions = this.nestedResourceFactory<
    IJukeSession,
    IJukeSessionCreate,
    IJukeSessionUpdate
  >(this.endpoints.jukebox.jukeSessionList)

  /**
   * Standard CRUD routes for account links.
   */
  readonly accountLinks = this.nestedResourceFactory<
    IAccountLink,
    IAccountLinkCreate,
    IAccountLinkUpdate
  >(this.endpoints.jukebox.accountLinkList)

  /**
   * Get account info for the active spotify account
   * linked to the Jukebox. This includes the necessary
   * access tokens to initialize the web player.
   *
   * Returns 404 if no account link is active.
   */
  public async getActiveAccountLink(jukeboxId: number) {
    const url = this.endpoints.jukebox.accountLinkActive(jukeboxId)

    return await this.get(url, {
      schema: SpotifyAccountSchema,
      mock: { data: mockSpotifyAccount, errorIfEmpty: true },
    })
  }

  /**
   * Fetch jukeboxes for clubs the user is a member of.
   *
   * The backend will check which clubs/jukeboxes
   * will make up the list for the user that is
   * connected to the auth token sent in the request.
   */
  public async listJukeboxesForClub(clubId: number) {
    const url = this.endpoints.jukebox.listForClub(clubId)

    return await this.get(url, {
      schema: JukeboxListSchema,
      mock: { data: mockJukeboxes },
    })
  }

  /**
   * Change the active device controlling playback
   * for Spotify.
   */
  public async connectPlayerDevice(jukeboxId: number, deviceId: string) {
    const url = this.endpoints.jukebox.connectDevice(jukeboxId)

    return await this.post<IPlayerState>(url, {
      body: { device_id: deviceId },
    })
  }

  /**
   * Get the current player state for a jukebox,
   */
  public async getCurrentlyPlaying(jukeboxId: number) {
    const url = this.endpoints.jukebox.playerState(jukeboxId)

    return await this.get<IPlayerState>(url, {
      mock: { data: mockPlayerQueueState },
    })
  }

  /**
   * Get the next tracks that are queued up.
   * Excludes the current track.
   */
  public async getQueuedTracks(jukeboxId: number, jukeSessionId: number) {
    const url = this.endpoints.jukebox.queueTrackList(jukeboxId, jukeSessionId)

    return await this.get<IQueue>(url)
  }

  /**
   * Clears the track queue for next tracks.
   */
  public async clearNextTracks(jukeboxId: number, jukeSessionId: number) {
    const url = this.endpoints.jukebox.queueTrackList(jukeboxId, jukeSessionId)

    return await this.delete(url)
  }

  /**
   * Get url for redirecting to spotify for logging in.
   */
  public async getSpotifyAuthRedirectUrl(jukeboxId?: number) {
    const url = this.endpoints.spotify.login(location.href, jukeboxId)
    return await this.get(url, { schema: SpotifyAuthRedirectUrlSchema })
  }

  // TODO: Fix this on backend
  public async searchTracks(
    jukeboxId: number,
    trackName: string,
    albumName: string,
    artistName: string,
  ) {
    const url = this.endpoints.jukebox.search(jukeboxId)

    const response = await this.post(url, {
      body: {
        trackQuery: trackName,
        albumQuery: albumName,
        artistQuery: artistName,
      },
    })

    return response
  }

  /**
   * Add track to the queue.
   */
  public async queueTrack(
    jukeboxId: number,
    jukeSessionId: number,
    body: IQueueUpTrack,
  ) {
    const url = this.endpoints.jukebox.queueTrackList(jukeboxId, jukeSessionId)

    return await this.post<IQueuedTrack>(url, {
      body,
    })
  }

  /**
   * Remove track from the queue.
   */
  public async removeQueuedTrack(
    jukeboxId: number,
    queueId: number,
    queuedTrackId: number,
  ) {
    const url = this.endpoints.jukebox.queueTrackDetail(
      jukeboxId,
      queueId,
      queuedTrackId,
    )

    return await this.delete(url)
  }

  /**
   * Set ordering of all tracks in the queue.
   */
  public async setQueueOrder(
    jukeboxId: number,
    jukeSessionId: number,
    body: ISetQueueOrder,
  ) {
    const url = this.endpoints.jukebox.queueTrackList(jukeboxId, jukeSessionId)
    return await this.post<IQueue>(url, {
      body,
    })
  }

  /**
   * Get all spotify accounts for the current user.
   */
  public async getSpotifyAccounts() {
    const url = this.endpoints.spotify.accountList
    return await this.get<ISpotifyAccount>(url, {
      mock: { data: mockSpotifyAccount },
    })
  }

  /**
   * Remove spotify account for the current user.
   */
  public async deleteSpotifyAccount(id: number) {
    const url = this.endpoints.spotify.accountDetail(id)
    return await this.delete(url)
  }
}
