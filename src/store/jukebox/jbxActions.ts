import { unwrapResult } from '@reduxjs/toolkit'
import { SPOTIFY_AUTH_CHECK_MS } from 'src/config'
import { NotImplementedError } from 'src/utils'
import { jukeboxActions } from '.'
import { store } from '../store'
import {
  selectActiveLink,
  selectCurrentJukebox,
  selectCurrentTrack,
  selectSpotifyAuth,
} from './jbxSelectors'
import {
  thunkClearNextTracks,
  thunkFetchCurrentlyPlaying,
  thunkFetchJBX,
  thunkFetchJukeboxes,
  thunkFetchNextTracks,
  thunkSyncSpotifyTokens,
  thunkUpdateActiveLink,
} from './jbxThunks'

const {
  setPlayerStateReducer,
  setNextTracksReducer,
  setHasAuxReducer,
  performPlayerUpdateReducer: updatePlayerStateReducer,
  setProgressReducer,
  setIsPlayingReducer,
  setInteractionReducer,
} = jukeboxActions

export const setPlayerState = (currentlyPlaying: IPlayerState) => {
  store.dispatch(setPlayerStateReducer(currentlyPlaying))
}

export const updatePlayerState = async (payload: IPlayerUpdate) => {
  // Check if there's currently a track in state, if not request it from api
  const currentTrack = selectCurrentTrack(store.getState())
  if (!currentTrack) {
    await fetchCurrentlyPlaying()
  }

  // ...Then process the update
  store.dispatch(updatePlayerStateReducer(payload))
}

export const setPlayerProgress = (ms: number) => {
  store.dispatch(setProgressReducer(ms))
}

export const setPlayerIsPlaying = (isPlaying: boolean) => {
  store.dispatch(setIsPlayingReducer(isPlaying))
}

export const setInteraction = (interaction: IJukeboxInteraction) => {
  store.dispatch(setInteractionReducer(interaction))
}

// export const incrementLiveProgress = () => {
//   store.dispatch(incrementLiveProgressReducer())
// }

export const setNextTracks = (nextTracks: IQueuedTrack[]) => {
  store.dispatch(setNextTracksReducer(nextTracks))
}

export const fetchJukeboxes = async (clubId: number) => {
  await store.dispatch(thunkFetchJukeboxes(clubId))
}
export const fetchCurrentlyPlaying = async () => {
  const jukeboxId = selectCurrentJukebox(store.getState())?.id
  console.log('jukebox id:', jukeboxId)
  if (!jukeboxId) return

  await store
    .dispatch(thunkFetchCurrentlyPlaying(jukeboxId))
    .then(unwrapResult)
    .then((res) => {
      console.log('currently playing from http:', res)
    })
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

    const expiresAt = new Date(auth?.expires_at).getTime()
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

export const fetchJukebox = async (jukeboxId: number) => {
  await store.dispatch(thunkFetchJBX(jukeboxId))
}
