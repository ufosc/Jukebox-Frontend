import { getRandomItem } from '../helpers/random'
import { mockQueuedTracks } from './mock-queued-track'

export const MockPlayerState: IPlayerState = {
  jukebox_id: 1,
  queued_track: getRandomItem(mockQueuedTracks),
  progress: 30000,
  is_playing: false,
  last_progress_update: new Date().toISOString(),
}

// When in dev mode, this allows us to use the access token defined
// in the .env file, instead of getting a token from the server.
let localSpotifyAccount: ISpotifyAccount | null = null
const localToken: string | undefined = import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN

if (localToken) {
  localSpotifyAccount = {
    id: 0,
    access_token: String(localToken),
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

export const MockSpotifyAccount = localSpotifyAccount
