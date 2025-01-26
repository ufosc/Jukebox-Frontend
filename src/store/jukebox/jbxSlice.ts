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
    playerState: null as IPlayerState | null,
    nextTracks: [] as IQueuedTrack[],
    spotifyAuth: null as ISpotifyAccount | null,
    liveProgress: 0 as number | null,
  },
  reducers: {
    setPlayerStateReducer: (state, action: { payload: IPlayerState }) => {
      state.playerState = action.payload
    },
    performPlayerUpdateReducer: (state, action: { payload: IPlayerUpdate }) => {
      if (!state.playerState?.current_track) return

      state.playerState = {
        ...state.playerState,
        ...action.payload,
        current_track: {
          ...(state.playerState.current_track || {}),
          ...(action.payload?.current_track || {}),
        },
      }
    },
    setNextTracksReducer: (state, action: { payload: IQueuedTrack[] }) => {
      state.nextTracks = action.payload
    },
    setHasAuxReducer: (state, action: { payload: boolean }) => {
      state.hasAux = action.payload
    },
    setLiveProgressReducer: (state, action: { payload: { ms?: number } }) => {
      state.liveProgress = action.payload.ms ?? null
    },
    incrementLiveProgressReducer: (state) => {
      state.liveProgress = (state.liveProgress ?? 0) + 1000
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
