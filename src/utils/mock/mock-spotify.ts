import { getRandomItem, getRandomSample } from '../helpers/random'
import { mockTrackMetas } from './mock-track-meta'
import { mockTracks } from './mock-tracks'

export const mockPlayerQueueState: IPlayerQueueState = {
  current_track: getRandomItem(mockTrackMetas),
  next_tracks: getRandomSample(mockTracks),
  default_next_tracks: [mockTracks[-1]],
  jukebox_id: 1,
  progress: 30000,
  is_playing: false,
}
