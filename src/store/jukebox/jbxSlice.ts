import { createSlice } from '@reduxjs/toolkit'
import { builderDefaults } from 'src/utils'
import {
  thunkFetchCurrentlyPlaying,
  thunkFetchJukeboxes,
  thunkFetchNextTracks,
  thunkSyncSpotifyTokens,
  thunkUpdateActiveLink,
} from './jbxThunks'

export const jukeboxSlice = createSlice({
  name: 'jukebox',
  initialState: {
    status: 'idle' as StoreStatus,
    error: null as string | null,
    jukeboxes: [] as IJukebox[],
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
  },
  extraReducers: (builder) => {
    builder.addCase(thunkFetchJukeboxes.fulfilled, (state, action) => {
      state.jukeboxes = action.payload

      if (action.payload.length > 0) {
        state.currentJukebox = action.payload[0]
      }
    })
    builder.addCase(thunkFetchCurrentlyPlaying.fulfilled, (state, action) => {
      console.log('Currently playing:', action)
      state.playerState = action.payload
    })
    builder.addCase(thunkFetchNextTracks.fulfilled, (state, action) => {
      state.nextTracks = action.payload
    })
    builder.addCase(thunkUpdateActiveLink.fulfilled, (state, action) => {
      state.hasAux = true
    })
    builder.addCase(thunkSyncSpotifyTokens.fulfilled, (state, action) => {
      state.spotifyAuth = action.payload
    })

    builderDefaults(builder)
  },
})

export type JukeboxState = ReturnType<typeof jukeboxSlice.reducer>
