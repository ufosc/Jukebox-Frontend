import { createAsyncThunk } from '@reduxjs/toolkit'
import { Network } from 'src/network'

const network = Network.getInstance()

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
    return await network.getCurrentUser()
  },
)

export const thunkLogoutUser = createAsyncThunk('user/logout', async () => {
  return await network.logout()
})

export const thunkUpdateLinks = createAsyncThunk('users/links', async () => {
  return await network.getLinks();
})
