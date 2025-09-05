import { SPOTIFY_AUTH_CHECK_MS } from 'src/config'
import { NotImplementedError } from 'src/utils'
import { jukeboxActions } from '.'
import { store } from '../store'
import {
  selectActiveLink,
  selectCurrentJukebox,
  selectJukeboxAndSessionIds,
  selectSpotifyAuth,
} from './jbxSelectors'
import {
  thunkFetchJukeboxes,
  thunkFetchQueue,
  thunkSyncSpotifyTokens,
  thunkUpdateAccountLink,
} from './jbxThunks'

const { setHasAuxReducer, setCurrentJukeboxReducer } = jukeboxActions

export const fetchJukeboxes = async (clubId: number) => {
  await store.dispatch(thunkFetchJukeboxes(clubId))
}

export const fetchSessionQueue = async () => {
  const { jukeboxId, jukeSessionId } = selectJukeboxAndSessionIds(
    store.getState(),
  )
  if (jukeboxId == null || jukeSessionId == null) return

  await store.dispatch(
    thunkFetchQueue({
      jukeboxId,
      jukeSessionId,
    }),
  )
}

export const setHasAux = (value: boolean) => {
  const jukeboxId = selectCurrentJukebox(store.getState())?.id
  if (!jukeboxId) return

  store.dispatch(setHasAuxReducer(value))
}

export const setCurrentJukebox = (id: number) => {
  store.dispatch(setCurrentJukeboxReducer({ id }))
}

/**
 * Authenticate with external music service specified in link
 */
export const authenticateLink = async (link?: IAccountLink) => {
  link = link ? link : selectActiveLink(store.getState())
  if (!link) return

  const jukeboxId = selectCurrentJukebox(store.getState())?.id
  if (!jukeboxId) return

  await store.dispatch(thunkUpdateAccountLink({ jukeboxId, link }))

  if (link.spotify_account) {
    await store.dispatch(thunkSyncSpotifyTokens(jukeboxId))
  } else {
    throw new NotImplementedError('Cannot connect non-spotify account')
  }
}

export const checkLinkAuth = async () => {
  const jukebox = selectCurrentJukebox(store.getState())
  const link = selectActiveLink(store.getState())

  if (!jukebox || !link) return

  if (link.spotify_account) {
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
