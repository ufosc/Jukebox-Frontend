import { createAsyncThunk } from '@reduxjs/toolkit'
import { Network } from 'src/network'

const network = Network.getInstance()

export const thunkFetchAdminGroups = createAsyncThunk(
  'group/fetchAdminGroups',
  async (groupId: string) => {},
)

export const thunkFetchGroupInfo = createAsyncThunk(
  'group/fetchGroupInfo',
  async (groupId: string) => {},
)

export const thunkFetchGroupSpotifyAuth = createAsyncThunk(
  'group/fetchGroupSpotifyAuth',
  async (groupId: string) => {
    return await network.sendGetSpotifyToken(groupId)
  },
)
