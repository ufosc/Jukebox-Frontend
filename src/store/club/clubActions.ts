import { store } from '../store'
import { selectCurrentClub } from './clubSelectors'
import { thunkFetchClubInfo, thunkFetchClubs } from './clubThunks'

export const fetchAllClubs = async () => {
  await store.dispatch(thunkFetchClubs())
}

export const fetchCurrentClubInfo = async () => {
  const club = selectCurrentClub(store.getState())
  if (!club) return

  await store.dispatch(thunkFetchClubInfo(club.id))
}
