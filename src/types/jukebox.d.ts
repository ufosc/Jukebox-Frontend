declare interface IModelBase {
  id: number
  created_at: DateString
  updated_at: DateString
}

/* == Jukebox Model == */
declare interface IJukebox extends IModelBase {
  name: string
  club_id: number
  time_format: '12-hour' | '24-hour'
  queue_size: number
}

declare interface IJukeboxCreate {
  name: string
  club_id: number
  time_format?: '12-hour' | '24-hour'
  queue_size?: number
}

declare interface IJukeboxUpdate {
  name: string
  time_format?: '12-hour' | '24-hour'
  queue_size?: number
}

/* == Juke Session Service == */
declare interface IJukeSession extends IModelBase {
  jukebox_id: number
  join_code: string
  qr_code: string
  next_order: number
  start_at: DateString
  end_at: DateString
  is_active: boolean
}

declare interface IJukeSessionCreate {
  start_at?: DateString

  end_at: DateString
}

declare interface IJukeSessionUpdate {
  start_at?: DateString
  end_at?: DateString
}

declare interface IJukeSessionMembership {
  juke_session: number
  user_id: number
  queued_tracks: number[]
}

declare interface IJukeSessionMembershipCreate {
  user_id: number
}

/* == Jukebox Queue Service == */
declare interface IQueuedTrack extends IModelBase {
  juke_session: IJukeSession
  queued_by: { user_id: number }
  track: ITrack
  likes: number
  dislikes: number
  played: boolean
  played_at?: DateString
  order: number

  /**
   * Is not editable if queued up in Spotify,
   * or if it was previously played.
   */
  is_editable: boolean
}

declare interface IQueuedTrackCreate {
  queued_by: { id: number }

  track: { id: number }
}

declare interface IQueueUpTrack {
  queued_by: { id: number }

  spotify_track_id: string
}

declare interface IQueue {
  juke_session: IJukeSession
  tracks: IQueuedTrack[]
}

declare interface ISetQueueOrder {
  ordering: number[]
}

/* == Track Service == */
declare interface ITrack extends IModelBase {
  name: string
  album: string
  release_year: number
  artists: string[]
  spotify_id: string
  spotify_uri: string
  duration_ms: number
  is_explicit: boolean
  preview_url: string | null
}

declare interface ITrackCreate {
  name: string
  album: string
  release_year: number
  artists: string[]
  spotify_id: string
  spotify_uri?: string
}

declare interface ITrackUpdate extends Partial<ITrackCreate> {}

/* == Player Service == */
declare interface IPlayerAction {
  action_type: import('./jukebox-enums').ActionType
}

declare interface IPlayerAuxClientUpdate {
  jukebox_id: number
  action: 'played' | 'paused' | 'changed_tracks' | 'other'
  progress?: number
  timestamp?: DateString
  current_track?: ITrack
}

declare interface IPlayerServerUpdate {
  jukebox_id: number
  progress?: number
  timestamp?: DateString
  current_track?: ITrack
  is_playing?: boolean
}

declare interface IPlayerInteractionCreate {
  interaction_type: import('./jukebox-enums').InteractionType
}

declare interface IPlayerState {
  jukebox_id: number
  /**
   * Set if the current track came from the queue.
   */
  queued_track?: IQueuedTrack
  /**
   * Set if the current track came from Spotify.
   */
  spotify_track?: ITrack
  progress: number
  last_progress_update: DateString
  is_playing: boolean
  /**
   * Spotify device id the player is playing on.
   */
  current_device_id?: string
  juke_session_id?: number
}

declare interface IPlayerAuxState {
  current_track?: Spotify.Track | null
  progress: number
  is_playing: boolean
}

declare interface ISetPlayerDevice {
  device_id: string
}

/* == Spotify Account Service == */
declare interface ISpotifyAccount extends IModelBase {
  access_token: string
  refresh_token: string
  user_id: number
  spotify_email: string
  expires_in: number
  expires_at: DateString
  token_type: string
}

declare interface ISpotifyAccountCreate {
  user_id: number
  spotify_email: string
  tokens: ISpotifyTokens
}

declare interface ISpotifyAccountUpdate {
  access_token: string
  expires_in: number
}

declare interface ISpotifyTokens {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
}

/* == Jukebox Account Link Service == */

declare interface IAccountLink extends IModelBase {
  jukebox_id: number
  spotify_account: ISpotifyAccount
  active: boolean
}

declare interface IAccountLinkCreate {
  spotify_account: ISpotifyAccount
  active?: boolean
}

declare interface IAccountLinkUpdate extends Partial<IAccountLInkCreate> {}
