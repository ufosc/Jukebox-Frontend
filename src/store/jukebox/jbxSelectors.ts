import { createSelector } from '@reduxjs/toolkit'
import type { JukeboxState } from './jbxSlice'

type RootState = {
  jukebox: JukeboxState
}

const jbxStateSelector = (state: RootState) => state.jukebox

export const selectAllJukeboxes = createSelector(
  jbxStateSelector,
  (state) => state.jukeboxes,
)

export const selectCurrentJukebox = createSelector(
  jbxStateSelector,
  (state) => state.currentJukebox,
)

export const selectHasJukeboxAux = createSelector(
  jbxStateSelector,
  (state) => state.hasAux,
)

export const selectJukeboxLinks = createSelector(
  jbxStateSelector,
  (state) => state.currentJukebox?.links,
)

export const selectSpotifyAuth = createSelector(
  jbxStateSelector,
  (state) => state.spotifyAuth,
)

export const selectPlayerState = createSelector(
  jbxStateSelector,
  (state) => state.playerState,
)

export const selectLiveProgress = createSelector(
  jbxStateSelector,
  (state) => state.liveProgress,
)

export const selectNextTracks = createSelector(
  jbxStateSelector,
  (state) => state.nextTracks,
)

export const selectActiveLink = createSelector(jbxStateSelector, (state) =>
  state.currentJukebox?.links.find((link) => link.active),
)

export const selectCurrentTrack = createSelector(
  jbxStateSelector,
  (state) => state.playerState?.current_track,
)
