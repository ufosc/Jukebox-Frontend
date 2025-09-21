import { MockSpotifyAccount } from './mock-spotify'

export const MockAccountLink: IAccountLink = {
  id: 1,
  spotify_account: MockSpotifyAccount!,
  active: true,
  jukebox_id: 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}
