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
    setIsPlayingReducer: (state, action: { payload: boolean }) => {
      if (!state.playerState) return
      state.playerState.is_playing = action.payload
    },
    setProgressReducer: (state, action: { payload: number }) => {
      if (!state.playerState) return
      state.playerState.progress = action.payload
      state.liveProgress = action.payload
    },
    setInteractionReducer: (
      state,
      action: { payload: IJukeboxInteraction },
    ) => {
      if (
        action.payload.jukebox_id !== state.currentJukebox?.id ||
        !state.playerState?.current_track
      ) {
        return
      }

      switch (action.payload.action) {
        case 'like':
          state.playerState.current_track.interactions.likes += 1
          break
        case 'dislike':
          state.playerState.current_track.interactions.dislikes += 1
          break
      }
    },
    performPlayerUpdateReducer: (state, action: { payload: IPlayerUpdate }) => {
      if (!state.playerState?.current_track) return

      Object.keys(action.payload).forEach((key: any) => {
        if (action.payload[key as keyof IPlayerUpdate] === undefined) {
          delete action.payload[key as keyof IPlayerUpdate]
        }
      })
      Object.assign(state.playerState, action.payload)

      if (action.payload.progress !== undefined) {
        state.liveProgress = action.payload.progress
      }
    },
    setNextTracksReducer: (state, action: { payload: IQueuedTrack[] }) => {
      state.nextTracks = action.payload
    },
    setHasAuxReducer: (state, action: { payload: boolean }) => {
      state.hasAux = action.payload
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
