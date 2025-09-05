import { createAsyncThunk } from '@reduxjs/toolkit'
import { ApiClient } from 'src/api'

const network = ApiClient.getInstance()

export const thunkLoginUser = createAsyncThunk(
  'user/loginUser',
  async (data: { username: string; password: string }) => {
    const { username, password } = data
    return await network.loginWithUsername(username, password)
  },
)

export const thunkInitializeUser = createAsyncThunk(
  'user/fetchInfo',
  async () => {
    return await network.getMe()
  },
)

export const thunkLogoutUser = createAsyncThunk('user/logout', async () => {
  return await network.logout()
})

export const thunkGetSpotifyAccounts = createAsyncThunk(
  'users/links',
  async () => {
    return await network.getSpotifyAccounts()
  },
)
