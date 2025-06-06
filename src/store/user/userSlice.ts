import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { builderDefaults } from 'src/utils'

import {
  thunkInitializeUser,
  // thunkFetchUserToken,
  thunkLoginUser,
  thunkLogoutUser,
  thunkUpdateLinks,
} from './userThunks'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as IUserDetails | null,
    loggedIn: null as boolean | null,
    status: 'idle' as StoreStatus,
    error: null as string | null,
    links: null as ISpotifyLink[] | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunkInitializeUser.fulfilled, (state, action) => {
      if (!action.payload.success) {
        state.user = null
        state.loggedIn = false
        state.error = 'Failed to initialize user'

        return
      }

      state.loggedIn = true
      state.user = action.payload.data
    })

    builder.addCase(thunkLoginUser.fulfilled, (state, action) => {
      if (!action.payload.success) {
        state.loggedIn = false
        state.user = null
        state.status = 'failed'
        state.error = 'Failed to authenticate user'
        return
      }

      state.loggedIn = true
    })
    builder.addCase(thunkLoginUser.rejected, (state, action) => {
      state.loggedIn = false
      state.error = action.error.message || null
    })

    builder.addCase(thunkLogoutUser.fulfilled, (state, action) => {
      state.loggedIn = false
      state.user = null
    })

    builder.addCase(thunkUpdateLinks.fulfilled, (state, action) => {
      //console.log(action.payload)
      if (!action.payload.success) {
        state.links = null
        state.error = 'Failed to get Spotify Links'
        return
      }
      
      state.links = action.payload.data;
    })

    builder.addCase(thunkUpdateLinks.rejected, (state, action) => {
      //console.log(action.payload);

      return
    })

    builderDefaults(builder)
  },
})

export type UserState = ReturnType<typeof userSlice.reducer>
