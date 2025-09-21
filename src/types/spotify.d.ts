declare interface ISpotifyTrackImage {
  url: string
  height?: number | null
  width?: number | null
}

/**
 * Base fields for a track's artist.
 * This is used in both the Spotify API and the Spotify player.
 */
declare interface ISpotifyArtistInline {
  name: string
  uri: string
}

/**
 * Base fields for a track's album.
 * This is used in both the Spotify API and the Spotify player.
 */
declare interface ISpotifyAlbumInline {
  uri: string
  name: string
  images: ITrackImage[]
}

/**
 * Track information returned from
 * the Spotify web player.
 */
declare interface ISpotifyPlayerTrack {
  id: string
  uri: string
  name: string
  type: 'track' | 'episode' | 'ad'
  duration_ms: number
  album: ISpotifyAlbumInline
  artists: ISpotifyArtistInline[]
  uid: string
  linked_from: { uri: string | null; id: string | null }
  media_type: 'audio' | 'video'
  track_type: 'audio' | 'video'
  content_type?: 'music'
  is_playable: boolean
  metadata?: any
}
