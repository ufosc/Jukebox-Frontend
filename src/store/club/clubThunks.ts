import { createAsyncThunk } from '@reduxjs/toolkit'
import { Network } from 'src/network'

const network = Network.getInstance()

export const thunkFetchAdminClubs = createAsyncThunk(
  'club/fetchAdminClubs',
  async (clubId: string) => {},
)

export const thunkFetchClubInfo = createAsyncThunk(
  'club/fetchClubInfo',
  async (clubId: number) => {
    return await network.sendGetClubInfo(clubId)
  },
)

export const thunkFetchClubSpotifyAuth = createAsyncThunk(
  'club/fetchClubSpotifyAuth',
  async (clubId: number) => {
    return await network.sendGetSpotifyToken(clubId)
  },
)
