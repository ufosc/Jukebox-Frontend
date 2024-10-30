import { createSlice } from '@reduxjs/toolkit'
import { thunkFetchClubInfo, thunkFetchClubSpotifyAuth } from './clubThunks'

export const clubSlice = createSlice({
  name: 'club',
  initialState: {
    currentClub: null as IClub | null,
    spotifyAuth: null as ISpotifyAccount | null,
    status: 'idle' as StoreStatus,
    error: null as string | null,
    allClubs: [] as IClub[],
  },
  reducers: {
    setCurrentClubReducer: (state, action: { payload: IClub }) => {
      state.currentClub = action.payload
    },
    setAllClubsReducer: (state, action: { payload: IClub[] }) => {
      state.allClubs = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkFetchClubSpotifyAuth.fulfilled, (state, action) => {
      state.spotifyAuth = action.payload
    })
    builder.addCase(thunkFetchClubInfo.fulfilled, (state, action) => {
      state.currentClub = action.payload
    })

    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.status = 'loading'
      },
    )
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action: any) => {
        state.status = 'failed'
        state.error = action.error.message || null
      },
    )
    builder.addMatcher(
      (action) => action.type.endsWith('/fulfilled'),
      (state) => {
        state.status = 'succeeded'
        state.error = null
      },
    )
  },
})

export type ClubState = ReturnType<typeof clubSlice.reducer>
