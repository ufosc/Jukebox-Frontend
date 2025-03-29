import {
  ClubListSchema,
  ClubSchema,
  JukeboxListSchema,
  SpotifyAccountSchema,
  SpotifyAuthRedirectUrlSchema,
  UserDetailsSchema,
} from 'src/schemas'
import { PlayerStateSchema, QueuedTrackListSchema } from 'src/schemas/player'
import {
  getRandomSample,
  mockClubs,
  mockJukeboxes,
  mockQueuedTracks,
  mockSpotifyAccount,
  mockUser,
} from 'src/utils'
import { mockPlayerQueueState } from './../utils/mock/mock-spotify'
import { NetworkBase } from './NetworkBase'

/**
 * Handle API requests to connected servers.
 */
export class Network extends NetworkBase {
  private static instance: Network

  private constructor() {
    super()
  }

  /**
   * Ensures there only exists one instance
   * of this class.
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new this()
    }

    return this.instance
  }

  /*=== Club & User Routes ================================*/
  /**
   * Fetch details for logged in user.
   */
  public async getCurrentUser() {
    const url = this.endpoints.user.info

    return await this.request(url, UserDetailsSchema, {
      mock: { data: mockUser },
    })
  }

  /**
   * Fetch a list of clubs user is member of.
   */
  public async listClubs() {
    const url = this.endpoints.club.list

    return await this.request(url, ClubListSchema, {
      mock: { data: mockClubs },
    })
  }

  /**
   * Fetch details for a club.
   */
  public async getClub(id: number) {
    const url = this.endpoints.club.get(id)

    return await this.request(url, ClubSchema, {
      mock: {
        data: mockClubs.find((club) => club.id === id),
        errorIfEmpty: true,
      },
    })
  }

  /*=== Jukebox Routes ====================================*/
  /**
   * Get account info for the active spotify account
   * linked to the Jukebox. This includes the necessary
   * access tokens to initialize the web player.
   */
  public async getSpotifyAuth(jukeboxId: number) {
    const url = this.endpoints.jukebox.getSpotifyAccount(jukeboxId)

    return await this.request(url, SpotifyAccountSchema, {
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
  public async listJukeboxes() {
    const url = this.endpoints.jukebox.list

    return await this.request(url, JukeboxListSchema, {
      mock: { data: mockJukeboxes },
    })
  }

  /**
   * Change the active device controlling playback
   * for Spotify.
   */
  public async connectSpotifyDevice(jukeboxId: number, deviceId: string) {
    const url = this.endpoints.jukebox.connectDevice(jukeboxId)

    return await this.request(url, null, {
      method: 'POST',
      data: { device_id: deviceId },
    })
  }

  /**
   * Set a linked account as active for a jukebox.
   *
   * This will determine whose account is used when
   * managing the player state.
   */
  public async updateActiveJukeboxLink(jukeboxId: number, link: IJukeboxLink) {
    const url = this.endpoints.jukebox.activeLink(jukeboxId)

    return await this.request(url, null, {
      method: 'POST',
      data: { type: link.type, email: link.email },
    })
  }

  /**
   * Get the current player state for a jukebox,
   * includes the player queue.
   *
   * Throws a 404 error if nothing is playing.
   */
  public async getCurrentlyPlaying(jukeboxId: number) {
    const url = this.endpoints.jukebox.playerState(jukeboxId)

    return await this.request(url, PlayerStateSchema, {
      mock: { data: mockPlayerQueueState },
    })
  }

  /**
   * Get the next tracks that are queued up.
   * Excludes the current track.
   */
  public async getNextTracks(jukeboxId: number) {
    const url = this.endpoints.jukebox.nextTracks(jukeboxId)

    return await this.request(url, QueuedTrackListSchema, {
      mock: { data: getRandomSample(mockQueuedTracks) },
    })
  }

  /**
   * Clears the track queue for next tracks.
   */
  public async clearNextTracks(jukeboxId: number) {
    const url = this.endpoints.jukebox.nextTracks(jukeboxId)

    return await this.request(url, null, { method: 'DELETE' })
  }

  /**
   *
   */
  public async getSpotifyAuthRedirectUrl(jukeboxId?: number) {
    const url = this.endpoints.spotify.login(location.href, jukeboxId)
    return await this.request(url, SpotifyAuthRedirectUrlSchema)
  }
}
