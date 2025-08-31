import { createSlice } from '@reduxjs/toolkit'
import { builderDefaults } from 'src/utils'
import {
  thunkFetchJukebox,
  thunkFetchJukeboxes,
  thunkFetchQueue,
  thunkSyncSpotifyTokens,
} from './jbxThunks'

export const jukeboxSlice = createSlice({
  name: 'jukebox',
  initialState: {
    status: 'idle' as StoreStatus,
    error: null as string | null,
    jukeboxes: [] as IJukebox[],
    hasAux: false,
    currentJukebox: null as IJukebox | null,
    currentJukeSession: null as IJukeSession | null,
    queue: null as IQueue | null,
    spotifyAuth: null as ISpotifyAccount | null,
    liveProgress: 0 as number | null,
    accountLinks: [] as IAccountLink[],
  },
  reducers: {
    setHasAuxReducer: (state, action: { payload: boolean }) => {
      state.hasAux = action.payload
    },
    setCurrentJukeboxReducer: (state, action: { payload: { id: number } }) => {
      state.currentJukebox =
        state.jukeboxes.find((jukebox) => jukebox.id === action.payload.id) ??
        null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkFetchJukeboxes.fulfilled, (state, action) => {
      if (!action.payload.success) {
        state.jukeboxes = []
        return
      }
      state.jukeboxes = action.payload.data ?? []

      if (state.jukeboxes.length > 0) {
        state.currentJukebox = state.jukeboxes[0]
      }
    })
    builder.addCase(thunkFetchQueue.fulfilled, (state, action) => {
      if (!action.payload.success) {
        state.queue = null
        return
      }

      state.queue = action.payload.data
    })
    builder.addCase(thunkSyncSpotifyTokens.fulfilled, (state, action) => {
      if (!action.payload.success) {
        state.spotifyAuth = null
        return
      }

      state.spotifyAuth = action.payload.data
    })
    builder.addCase(thunkFetchJukebox.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.currentJukebox = action.payload.data
        return
      }
    })

    builderDefaults(builder)
  },
})

export type JukeboxState = ReturnType<typeof jukeboxSlice.reducer>
