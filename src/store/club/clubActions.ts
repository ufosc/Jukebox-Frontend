import { SPOTIFY_AUTH_CHECK_MS } from 'src/config'
import { store } from '../store'
import { selectCurrentClub, selectSpotifyAuthExpiration } from './clubSelectors'
import { clubSlice } from './clubSlice'
import { thunkFetchClubInfo, thunkFetchClubSpotifyAuth } from './clubThunks'

const { setAllClubsReducer, setCurrentClubReducer: setCurrentClubReducer } =
  clubSlice.actions

export const fetchCurrentClubInfo = async () => {
  const club = selectCurrentClub(store.getState())
  if (!club) return

  await store.dispatch(thunkFetchClubInfo(club.id))
  await store.dispatch(thunkFetchClubSpotifyAuth(club.id))
}

export const setCurrentClub = (club: IClub) => {
  store.dispatch(setCurrentClubReducer(club))
}

export const setAllClubs = (clubs: IClub[]) => {
  store.dispatch(setAllClubsReducer(clubs))
}

export const checkSpotifyAuth = async () => {
  const club = selectCurrentClub(store.getState())
  const expiresAt = selectSpotifyAuthExpiration(store.getState())

  // Check if auth expires before next interval, plus another interval as buffer
  const expiresMax = Date.now() + SPOTIFY_AUTH_CHECK_MS * 2

  if (!club || !expiresAt) return
  else if (expiresAt <= expiresMax) {
    await store.dispatch(thunkFetchClubSpotifyAuth(club.id))
  }
}
