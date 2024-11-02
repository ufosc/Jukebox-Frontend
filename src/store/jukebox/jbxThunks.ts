import { createAsyncThunk } from '@reduxjs/toolkit'
import { Network } from 'src/network'

const network = Network.getInstance()

export const thunkFetchJukeboxes = createAsyncThunk(
  'jukebox/fetchJukeboxes',
  async () => {
    return await network.sendGetJukeboxes()
  },
)
