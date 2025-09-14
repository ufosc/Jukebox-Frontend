import { localDataFactory } from 'src/utils'
import { clubActions } from '.'
import { store } from '../store'
import { selectAllClubs, selectCurrentClub } from './clubSelectors'
import {
  thunkFetchClubInfo,
  thunkFetchClubs,
  thunkFetchMemberships,
} from './clubThunks'

const { setCurrentClubIdReducer } = clubActions

const cachedSelectedClub = localDataFactory<number>('selected-club')

export const fetchAllClubs = async () => {
  await store.dispatch(thunkFetchClubs())
}

export const fetchCurrentClubInfo = async () => {
  let club = selectCurrentClub(store.getState())
  const clubs = selectAllClubs(store.getState())

  if (!club) {
    const clubId = cachedSelectedClub.get()

    if (clubId != null) {
      const selected = clubs.find((c) => c.id === clubId)
      if (!selected) return
      club = selected
    } else if (clubs.length > 0) {
      club = clubs[0]
    } else {
      return
    }
  }

  cachedSelectedClub.set(club.id)
  store.dispatch(setCurrentClubIdReducer(club.id))
}

export const setCurrentClub = async (clubID: number) => {
  store.dispatch(setCurrentClubIdReducer(clubID))
  await store.dispatch(thunkFetchClubInfo(clubID))
}

export const fetchMemberships = async () => {
  await store.dispatch(thunkFetchMemberships())
}
