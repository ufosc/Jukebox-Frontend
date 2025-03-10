import { store } from '../store'
import { selectCurrentClub } from './clubSelectors'
import { clubSlice } from './clubSlice'
import { thunkFetchClubInfo, thunkFetchClubs } from './clubThunks'

const { setAllClubsReducer, setCurrentClubReducer: setCurrentClubReducer } =
  clubSlice.actions

export const fetchAllClubs = async () => {
  await store.dispatch(thunkFetchClubs())
}

export const fetchCurrentClubInfo = async () => {
  const club = selectCurrentClub(store.getState())
  if (!club) return

  await store.dispatch(thunkFetchClubInfo(club.id))
}

export const setCurrentClub = (club: IClub) => {
  store.dispatch(setCurrentClubReducer(club))
}

export const setAllClubs = (clubs: IClub[]) => {
  store.dispatch(setAllClubsReducer(clubs))
}
