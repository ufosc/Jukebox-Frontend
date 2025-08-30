import { createAsyncThunk } from '@reduxjs/toolkit'
import { ApiClient } from 'src/api'

const network = ApiClient.getInstance()

export const thunkFetchClubs = createAsyncThunk('club/fetchClubs', async () => {
  return await network.listClubs()
})

export const thunkFetchClubInfo = createAsyncThunk(
  'club/fetchClubInfo',
  async (clubId: number) => {
    return await network.getClub(clubId)
  },
)

export const thunkFetchMembership = createAsyncThunk(
  'club/fetchMembershipInfo',
  async () => {
    return await network.getMyClubMemberships()
  },
)
