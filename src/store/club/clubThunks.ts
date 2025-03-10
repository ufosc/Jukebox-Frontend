import { createAsyncThunk } from '@reduxjs/toolkit'
import { Network } from 'src/network'

const network = Network.getInstance()

export const thunkFetchClubs = createAsyncThunk('club/fetchClubs', async () => {
  return await network.listClubs()
})

export const thunkFetchClubInfo = createAsyncThunk(
  'club/fetchClubInfo',
  async (clubId: number) => {
    return await network.getClub(clubId)
  },
)
