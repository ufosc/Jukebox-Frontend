declare type ITrack = Spotify.Track

declare interface ITrackMeta extends ITrack {
  queue_id: string
  recommended_by?: string
  spotify_queued?: boolean
  likes?: number
  dislikes?: number
}

declare interface IJukebox {
  id: number
  name: string
  club_id: number
  links: IJukeboxLink[]
}

declare type JukeboxLinkType = 'spotify'

declare interface IJukeboxLink {
  id: number
  type: JukeboxLinkType
  email: string
  active: boolean
}

declare interface ISpotifyAccount {
  id: number
  access_token: string
  user_id: number
  spotify_email: string
  expires_in: number
  expires_at: number
  token_type: string
}

declare interface IPlayerState {
  jukebox_id: number
  current_track?: ITrackMeta
  progress: number
  is_playing: boolean
}

/**
 * State of the current player stored in Redis
 */
declare interface IPlayerMetaState extends IPlayerState {
  /** Next up in Spotify's queue */
  default_next_tracks: ITrack[]
}

/**
 * The state of the player broadcast to socket subscribers
 */
declare interface IPlayerQueueState extends IPlayerState {
  /** Tracks queued up in server */
  next_tracks: ITrack[]
}

declare interface IPlayerAuxUpdate extends IPlayerMetaState {
  changed_tracks?: boolean
}
type IPlayerUpdate = IPlayerQueueState
