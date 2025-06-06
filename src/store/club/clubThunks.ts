import { createAsyncThunk } from '@reduxjs/toolkit'
import { Network } from 'src/network'

const network = Network.getInstance()

declare interface FetchMembershipArgs {
  clubId: number
  memberId: number
}

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
  async (args: FetchMembershipArgs) => {
    return await network.getCurrentMembership(args.clubId, args.memberId)
  },
)
