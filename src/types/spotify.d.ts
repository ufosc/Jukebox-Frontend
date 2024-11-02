declare type ITrack = Spotify.Track

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

declare interface ITrackStateUpdate {
  current_track?: ITrack
  // is_playing: boolean
  next_tracks?: ITrack[]
  jukebox_id: number
}

declare interface IPlayerUpdate {
  current_track?: ITrack
  jukebox_id: number
}
