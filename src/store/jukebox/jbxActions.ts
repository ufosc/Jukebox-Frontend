import { NotImplementedError } from 'src/utils'
import { jukeboxActions } from '.'
import { store } from '../store'
import { selectCurrentJukebox } from './jbxSelectors'
import {
  thunkFetchCurrentlyPlaying,
  thunkFetchJukeboxes,
  thunkFetchNextTracks,
  thunkSyncSpotifyTokens,
  thunkUpdateActiveLink,
} from './jbxThunks'

const { setCurrentlyPlayingReducer, setNextTracksReducer } = jukeboxActions

// export const setCurrentlyPlaying = (currentlyPlaying: ICurrentlyPlaying) => {
//   store.dispatch(setCurrentlyPlayingReducer(currentlyPlaying))
// }

// export const setNextTracks = (nextTracks: ITrack[]) => {
//   store.dispatch(setNextTracksReducer(nextTracks))
// }

export const fetchJukeboxes = async () => {
  await store.dispatch(thunkFetchJukeboxes())
}

export const fetchCurrentlyPlaying = async () => {
  const jukeboxId = selectCurrentJukebox(store.getState())?.id

  if (!jukeboxId) return
  await store.dispatch(thunkFetchCurrentlyPlaying(jukeboxId))
}

export const fetchNextTracks = async () => {
  const jukeboxId = selectCurrentJukebox(store.getState())?.id

  if (!jukeboxId) return
  await store.dispatch(thunkFetchNextTracks(jukeboxId))
}

/**
 * Set link as active, move playback to this tab
 */
export const connectJukeboxAux = async (link: IJukeboxLink) => {
  const jukeboxId = selectCurrentJukebox(store.getState())?.id
  if (!jukeboxId) return

  await store.dispatch(thunkUpdateActiveLink({ jukeboxId, link }))

  if (link.type === 'spotify') {
    await store.dispatch(thunkSyncSpotifyTokens(jukeboxId))
  } else {
    throw new NotImplementedError('Cannot connect non-spotify account')
  }
}
