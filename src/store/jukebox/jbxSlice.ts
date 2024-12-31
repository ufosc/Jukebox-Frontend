import { createSlice } from '@reduxjs/toolkit'
import { builderDefaults } from 'src/utils'
import {
  thunkFetchCurrentlyPlaying,
  thunkFetchJukeboxes,
  thunkFetchNextTracks,
  thunkSyncSpotifyTokens,
} from './jbxThunks'

export const jukeboxSlice = createSlice({
  name: 'jukebox',
  initialState: {
    status: 'idle' as StoreStatus,
    error: null as string | null,
    jukeboxes: [] as IJukebox[],
    /** User is connected to spotify, and the player is active */
    hasAux: false,
    currentJukebox: null as IJukebox | null,
    playerState: null as IPlayerQueueState | null,
    nextTracks: [] as ITrack[],
    spotifyAuth: null as ISpotifyAccount | null,
  },
  reducers: {
    setCurrentlyPlayingReducer: (
      state,
      action: { payload: IPlayerQueueState },
    ) => {
      state.playerState = action.payload
    },
    setNextTracksReducer: (state, action: { payload: ITrack[] }) => {
      state.nextTracks = action.payload
    },
    setHasAuxReducer: (state, action: { payload: boolean }) => {
      state.hasAux = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkFetchJukeboxes.fulfilled, (state, action) => {
      state.jukeboxes = action.payload

      if (action.payload.length > 0) {
        state.currentJukebox = action.payload[0]
      }
    })
    builder.addCase(thunkFetchCurrentlyPlaying.fulfilled, (state, action) => {
      state.playerState = action.payload
    })
    builder.addCase(thunkFetchNextTracks.fulfilled, (state, action) => {
      state.nextTracks = action.payload
    })
    builder.addCase(thunkSyncSpotifyTokens.fulfilled, (state, action) => {
      state.spotifyAuth = action.payload
    })

    builderDefaults(builder)
  },
})

export type JukeboxState = ReturnType<typeof jukeboxSlice.reducer>
