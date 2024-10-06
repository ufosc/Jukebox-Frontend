import { store } from '../store'
import { selectCurrentClub } from './clubSelectors'
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
