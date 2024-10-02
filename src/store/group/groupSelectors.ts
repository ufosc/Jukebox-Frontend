import { createSelector } from '@reduxjs/toolkit'
import type { GroupState } from './groupSlice'

type RootState = {
  group: GroupState
}

const groupStateSelector = (state: RootState) => state.group

export const selectCurrentGroup = createSelector(
  groupStateSelector,
  (state) => state.currentGroup,
)

export const selectGroupSpotifyAuth = createSelector(
  groupStateSelector,
  (state) => state.spotifyAuth,
)

export const selectAllGroups = createSelector(
  groupStateSelector,
  (state) => state.allGroups,
)
