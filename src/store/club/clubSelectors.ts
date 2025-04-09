import { createSelector } from '@reduxjs/toolkit'
import type { ClubState } from './clubSlice'

type RootState = {
  club: ClubState
}

const clubStateSelector = (state: RootState) => state.club

export const selectCurrentClub = createSelector(
  clubStateSelector,
  (state) => state.currentClub,
)

export const selectAllClubs = createSelector(
  clubStateSelector,
  (state) => state.allClubs,
)

