import { createAsyncThunk } from '@reduxjs/toolkit'
import { ApiClient } from 'src/api'

const network = ApiClient.getInstance()

export const thunkFetchJukeboxes = createAsyncThunk(
  'jukebox/fetchJukeboxes',
  async (clubId: number) => {
    return await network.listJukeboxes(clubId)
  },
)

export const thunkFetchJBX = createAsyncThunk(
  'jukebox/fetchJBX',
  async (jukeboxId: number) => {
    return await network.getJukebox(jukeboxId)
  },
)

export const thunkFetchCurrentlyPlaying = createAsyncThunk(
  'jukebox/fetchCurrentlyPlaying',
  async (jukeboxId: number) => {
    const res = network.getCurrentlyPlaying(jukeboxId)
    return res
    //return await network.getCurrentlyPlaying(jukeboxId)
  },
)

export const thunkFetchNextTracks = createAsyncThunk(
  'jukebox/fetchNextTracks',
  async (jukeboxId: number) => {
    return await network.getNextTracks(jukeboxId)
  },
)

export const thunkClearNextTracks = createAsyncThunk(
  'jukebox/clearNextTracks',
  async (jukeboxId: number) => {
    await network.clearNextTracks(jukeboxId)
  },
)

export const thunkUpdateActiveLink = createAsyncThunk(
  'jukebox/updateActiveLink',
  async (payload: { jukeboxId: number; link: IJukeboxLink }) => {
    await network.updateActiveJukeboxLink(payload.jukeboxId, payload.link)
    return { link: payload.link }
  },
)

export const thunkSyncSpotifyTokens = createAsyncThunk(
  'jukebox/syncSpotifyTokens',
  async (clubId: number) => {
    return await network.getSpotifyAuth(clubId)
  },
)
