import { createSlice } from '@reduxjs/toolkit'
import { builderDefaults } from 'src/utils'
import {
  thunkInitializeUser,
  // thunkFetchUserToken,
  thunkLoginUser,
} from './userThunks'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as IUser | null,
    loggedIn: null as boolean | null,
    status: 'idle' as StoreStatus,
    error: null as string | null,
  },
  reducers: {
    set: (state, action: { payload: { user: IUser } }) => {
      // TODO: Make thunk for verifying user login, or catching system error
      const { user } = action.payload
      state.user = user
      state.loggedIn = true
    },
    logout: (state) => {
      state.loggedIn = false
      state.user = null
    },
    update: (state, action: { payload: { user: IUser } }) => {
      state.user = { ...(state.user || {}), ...action.payload.user }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkInitializeUser.fulfilled, (state, action) => {
      if (!action.payload.success) {
        state.user = null
        state.loggedIn = false
        state.error = 'Failed to initialize user'

        return
      }

      state.user = action.payload.data
      state.loggedIn = true
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
    builderDefaults(builder)
  },
})

export type UserState = ReturnType<typeof userSlice.reducer>
