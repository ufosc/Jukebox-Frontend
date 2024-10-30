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
