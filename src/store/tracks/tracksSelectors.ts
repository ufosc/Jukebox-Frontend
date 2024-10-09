import { createSelector } from '@reduxjs/toolkit'
import type { TrackState } from './tracksSlice'

type RootState = {
  track: TrackState
}

const TrackStateSelector = (state: RootState) => state.track

export const selectCurrentTrack = createSelector(
  TrackStateSelector,
  (state) => state.currentTrack,
)

export const selectNextTracks = createSelector(
  TrackStateSelector,
  (state) => state.nextTracks,
)

export const selectAllTracks = createSelector(TrackStateSelector, (state) => [
  state.currentTrack,
  ...state.nextTracks,
])
