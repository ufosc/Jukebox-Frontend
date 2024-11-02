import { createSlice } from '@reduxjs/toolkit'
import { builderDefaults } from 'src/utils'

export const trackSlice = createSlice({
  name: 'track',
  initialState: {
    currentTrack: null as ITrack | null,
    nextTracks: [] as ITrack[],
    status: 'idle' as StoreStatus,
    error: null as string | null,
  },
  reducers: {
    setCurrentTrackReducer: (state, action: { payload: Nullable<ITrack> }) => {
      state.currentTrack = action.payload ?? null
    },
    setNextTracksReducer: (state, action: { payload: ITrack[] }) => {
      state.nextTracks = action.payload
    },
  },
  extraReducers: (builder) => {
    builderDefaults(builder)
  },
})

export type TrackState = ReturnType<typeof trackSlice.reducer>
