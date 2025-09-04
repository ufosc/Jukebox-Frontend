import { createSelector } from '@reduxjs/toolkit'
import type { UserState } from './userSlice'

type RootState = {
  user: UserState
}

const userStateSelector = (state: RootState) => state.user

export const selectUser = createSelector(
  userStateSelector,
  (state) => state.user,
)

export const selectUserLoggedIn = createSelector(
  userStateSelector,
  (state) => state.loggedIn,
)

export const selectUserError = createSelector(
  userStateSelector,
  (state) => state.error,
)

export const selectUserStatus = createSelector(
  userStateSelector,
  (state) => state.status,
)

export const selectAllLinks = createSelector(
  userStateSelector,
  (state) => state.spotifyAccounts,
)
