import { createSlice } from '@reduxjs/toolkit'
import { thunkFetchClubInfo, thunkFetchClubs } from './clubThunks'

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
    builder.addCase(thunkFetchClubs.fulfilled, (state, action) => {
      if (!action.payload.success) {
        state.status = 'failed'
        state.error = action.payload.data.error ?? 'Invalid Request'
        return
      }
      state.allClubs = action.payload.data ?? []

      if (state.allClubs.length > 0) {
        state.currentClub = state.allClubs[0]
      }
    })
    builder.addCase(thunkFetchClubInfo.fulfilled, (state, action) => {
      if (!action.payload.success) return

      state.currentClub = action.payload.data ?? null
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
