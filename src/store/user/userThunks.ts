import { createAsyncThunk } from '@reduxjs/toolkit'
import { Network } from 'src/network'

const network = Network.getInstance()

export const thunkLoginUser = createAsyncThunk(
  'user/loginUser',
  async (data: {
    email: string
    password: string
  }): Promise<
    | { success: true; token: string }
    | {
        success: false
        emailError?: string
        passwordError?: string
        error?: string
      }
  > => {
    const { email, password } = data
    const res = await network.sendLoginUser(email, password)

    if (!res.success) {
      return {
        success: false,
        emailError: res.error.emailError,
        passwordError: res.error.passwordError,
        error: res.error.message,
      }
    } else {
      return { success: true, token: res.value }
    }
  },
)

export const thunkFetchUserInfo = createAsyncThunk(
  'user/fetchInfo',
  async () => {
    const user = await network.sendGetUserInfo()

    return { user }
  },
)

// export const thunkGetUserSpotifyToken = createAsyncThunk(
//   'user/getSpotifyToken',
//   async () => {
//     return await network.sendGetSpotifyToken()
//   },
// )
