import { createSlice } from '@reduxjs/toolkit'
import { thunkFetchUserInfo, thunkLoginUser } from './userThunks'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as IUser | null,
    token: null as string | null,
    loggedIn: null as boolean | null,
    status: 'idle' as StoreStatus,
    error: null as string | null,
    // spotifyToken: null as string | null,
  },
  reducers: {
    set: (state, action: { payload: { user: IUser; token: string } }) => {
      // TODO: Make thunk for verifying user login, or catching system error
      const { user, token } = action.payload
      state.user = user
      state.token = token
      state.loggedIn = true
    },
    logout: (state) => {
      state.loggedIn = false
      state.token = null
      state.user = null
    },
    update: (state, action: { payload: { user: IUser } }) => {
      const { firstName, lastName, email, image, id } = action.payload.user
      const name = `${firstName} ${lastName}`

      state.user = {
        firstName: firstName ?? state.user?.firstName,
        lastName: lastName ?? state.user?.lastName,
        email: email ?? state.user?.email,
        image: image ?? state.user?.image,
        id: id ?? state.user?.id,
        groups: [],
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkLoginUser.fulfilled, (state, action) => {
      const res = action.payload
      if (res.success) {
        state.token = res.token
        state.loggedIn = true
      } else {
        state.loggedIn = false
        state.error = res.error || null
      }
    })
    builder.addCase(thunkFetchUserInfo.fulfilled, (state, action) => {
      const { user } = action.payload
      state.user = user
    })
    builder.addCase(thunkLoginUser.rejected, (state, action) => {
      state.loggedIn = false
      state.error = action.error.message || null
    })
    // builder.addCase(thunkGetUserSpotifyToken.fulfilled, (state, action) => {
    //   state.spotifyToken = action.payload
    // })

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

export type UserState = ReturnType<typeof userSlice.reducer>
