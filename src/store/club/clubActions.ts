import { store } from '../store'
import { selectCurrentClub } from './clubSelectors'
import { thunkFetchClubInfo, thunkFetchClubs, thunkFetchMembership } from './clubThunks'

export const fetchAllClubs = async () => {
  await store.dispatch(thunkFetchClubs())
}

export const fetchCurrentClubInfo = async () => {
  const club = selectCurrentClub(store.getState())
  if (!club) return

  await store.dispatch(thunkFetchClubInfo(club.id))
}

export const updateClub = async (clubID:number) => {
  await store.dispatch(thunkFetchClubInfo(clubID))
}

export const updateMembership = async(clubId: number, memberId:number) => {
  await store.dispatch(thunkFetchMembership({clubId, memberId}))
}
