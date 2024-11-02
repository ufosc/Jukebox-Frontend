import { configureStore } from '@reduxjs/toolkit'
import { clubReducer } from './club'
import { jukeboxReducer } from './jukebox'
import { trackReducer } from './track'
import { userReducer } from './user'

export const store = configureStore({
  reducer: {
    user: userReducer,
    club: clubReducer,
    jukebox: jukeboxReducer,
    track: trackReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
