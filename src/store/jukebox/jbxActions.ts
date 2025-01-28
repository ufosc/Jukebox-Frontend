import { SPOTIFY_AUTH_CHECK_MS } from 'src/config'
import { NotImplementedError } from 'src/utils'
import { jukeboxActions } from '.'
import { store } from '../store'
import {
  selectActiveLink,
  selectCurrentJukebox,
  selectPlayerState,
  selectSpotifyAuth,
} from './jbxSelectors'
import {
  thunkClearNextTracks,
  thunkFetchCurrentlyPlaying,
  thunkFetchJukeboxes,
  thunkFetchNextTracks,
  thunkSyncSpotifyTokens,
  thunkUpdateActiveLink,
} from './jbxThunks'

const {
  setPlayerStateReducer,
  setNextTracksReducer,
  setHasAuxReducer,
  performPlayerActionReducer: updatePlayerStateReducer,
  setLiveProgressReducer,
  incrementLiveProgressReducer,
} = jukeboxActions

export const setPlayerState = (currentlyPlaying: IPlayerMetaState) => {
  store.dispatch(setPlayerStateReducer(currentlyPlaying))
}

export const updatePlayerState = (currentlyPlaying: IPlayerMetaUpdate) => {
  const prevState = selectPlayerState(store.getState())
  const payload: IPlayerMetaState = {
    ...prevState,
    ...currentlyPlaying,
    default_next_tracks: currentlyPlaying.default_next_tracks ?? [],
    is_playing: currentlyPlaying.is_playing ?? false,
  }
  setLiveProgress(payload.progress)
  store.dispatch(setPlayerStateReducer(payload))
}

export const doPlayerAction = (payload: IPlayerAction) => {
  store.dispatch(updatePlayerStateReducer(payload))
}

export const setLiveProgress = (ms?: number) => {
  store.dispatch(setLiveProgressReducer({ ms }))
}

export const incrementLiveProgress = () => {
  store.dispatch(incrementLiveProgressReducer())
}

export const setNextTracks = (nextTracks: ITrackMeta[]) => {
  store.dispatch(setNextTracksReducer(nextTracks))
}

export const fetchJukeboxes = async () => {
  await store.dispatch(thunkFetchJukeboxes())
}

<<<<<<< HEAD

export const setCurrentJukebox = async () => {
  //needs to store the current jukebox (state.currentJukebox) here to local storage
  
}
=======
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

export const clearNextTracks = async () => {
  const jukeboxId = selectCurrentJukebox(store.getState())?.id
  if (!jukeboxId) return

  await store.dispatch(thunkClearNextTracks(jukeboxId))
}

export const setHasAux = (value: boolean) => {
  const jukeboxId = selectCurrentJukebox(store.getState())?.id
  if (!jukeboxId) return

  store.dispatch(setHasAuxReducer(value))
}

/**
 * Authenticate with external music service specified in link
 */
export const authenticateLink = async (link?: IJukeboxLink) => {
  link = link ? link : selectActiveLink(store.getState())
  if (!link) return

  const jukeboxId = selectCurrentJukebox(store.getState())?.id
  if (!jukeboxId) return

  await store.dispatch(thunkUpdateActiveLink({ jukeboxId, link }))

  if (link.type === 'spotify') {
    await store.dispatch(thunkSyncSpotifyTokens(jukeboxId))
  } else {
    throw new NotImplementedError('Cannot connect non-spotify account')
  }
}

export const checkLinkAuth = async () => {
  const jukebox = selectCurrentJukebox(store.getState())
  const link = selectActiveLink(store.getState())

  if (!jukebox || !link) return

  if (link.type === 'spotify') {
    const auth = selectSpotifyAuth(store.getState())
    if (!auth) return

    const expiresAt = auth?.expires_at
    const expiresMax = Date.now() + SPOTIFY_AUTH_CHECK_MS * 2

    // Check if auth expires before next interval, plus another interval as buffer
    if (expiresAt > expiresMax) return

    await store.dispatch(thunkSyncSpotifyTokens(jukebox.id))
    console.log('Successfully refreshed spotify tokens')
  } else {
    throw new NotImplementedError(
      'Handling non-spotify auth credentials is not implemented yet.',
    )
  }
}
>>>>>>> e5f6f449c37df3f83fe8b6139cbec1ddeb7e32e2
