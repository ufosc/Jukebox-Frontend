import { createSelector } from '@reduxjs/toolkit'
import type { JukeboxState } from './jbxSlice'

type RootState = {
  jukebox: JukeboxState
}

export const selectJukeboxState = (state: RootState) => state.jukebox

export const selectAllJukeboxes = createSelector(
  selectJukeboxState,
  (state) => state.jukeboxes,
)

export const selectCurrentJukebox = createSelector(
  selectJukeboxState,
  (state) => state.currentJukebox,
)

export const selectCurrentJukeSession = createSelector(
  selectJukeboxState,
  (state) => state.currentJukeSession,
)

export const selectCurrentJukeSessionMembership = createSelector(
  selectJukeboxState,
  (state) => state.currentJukeSessionMembership,
)

export const selectHasJukeboxAux = createSelector(
  selectJukeboxState,
  (state) => state.hasAux,
)

export const selectAccountLinks = createSelector(
  selectJukeboxState,
  (state) => state.accountLinks,
)

export const selectSpotifyAuth = createSelector(
  selectJukeboxState,
  (state) => state.spotifyAuth,
)

export const selectNextTracks = createSelector(
  selectJukeboxState,
  (state) => state.queue?.tracks ?? [],
)

export const selectActiveLink = createSelector(selectJukeboxState, (state) =>
  state.accountLinks.find((link) => link.active),
)

export const selectJukeboxAndSessionIds = createSelector(
  selectJukeboxState,
  (state) => ({
    jukeboxId: state.currentJukebox?.id,
    jukeSessionId: state.currentJukeSession?.id,
  }),
)

// export const selectDeviceId = createSelector(
//   selectJukeboxState,
//   (state) => state.deviceId,
// )
