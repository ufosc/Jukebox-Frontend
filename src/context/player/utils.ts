export const parseTrackObj = (track: Spotify.Track): ITrack => {
  return {
    name: track.name,
    album: track.album.name,
    release_year: track.album.release_date ? parseInt(track.album.release_date.split('-')[0]): 0,
    artists: track.artists.map((artist) => artist.name),
    spotify_id: track.id!,
    spotify_uri: track.uri,
    duration_ms: track.duration_ms,
    is_explicit: track.explicit,
    preview_url: null, //depricated
    image_url: track.album.images?.[0]?.url ?? null,
    id: 0, // TODO: Get from API
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}
