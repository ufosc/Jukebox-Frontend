export const parseTrackObj = (track: Spotify.Track): ITrack => {
  return {
    name: track.name,
    album: track.album.name,
    release_year: 0, // TODO: Get from api
    artists: track.artists.map((artist) => artist.name),
    spotify_id: track.id!,
    spotify_uri: track.uri,
    duration_ms: track.duration_ms,
    is_explicit: false, // TODO: Get from API
    preview_url: null,
    id: 0, // TODO: Get from API
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}
