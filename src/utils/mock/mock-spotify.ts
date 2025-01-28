import { getRandomItem, getRandomSample } from '../helpers/random'
import { mockTrackMetas } from './mock-track-meta'

export const mockPlayerQueueState: IPlayerQueueState = {
  current_track: getRandomItem(mockTrackMetas),
  next_tracks: getRandomSample(mockTrackMetas),
  jukebox_id: 1,
  progress: 30000,
  is_playing: false,
}
