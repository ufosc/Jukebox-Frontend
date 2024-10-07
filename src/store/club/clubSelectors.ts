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

export const selectClubSpotifyAuth = createSelector(
  clubStateSelector,
  (state) => state.spotifyAuth,
)

export const selectAllClubs = createSelector(
  clubStateSelector,
  (state) => state.allClubs,
)

export const selectOtherClubs = createSelector(clubStateSelector, (state) =>
  state.allClubs.filter((club) => club.id !== state.currentClub?.id),
)
