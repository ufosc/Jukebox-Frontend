import { createAsyncThunk } from '@reduxjs/toolkit'
import { ApiClient } from 'src/api'

const api = ApiClient.getInstance()

export const thunkFetchJukeboxes = createAsyncThunk(
  'jukebox/fetchJukeboxes',
  async (clubId: number) => {
    return await api.listJukeboxesForClub(clubId)
  },
)

export const thunkFetchJukebox = createAsyncThunk(
  'jukebox/fetchJBX',
  async (jukeboxId: number) => {
    return await api.jukeboxes.retrieve(jukeboxId)
  },
)

export const thunkFetchCurrentlyPlaying = createAsyncThunk(
  'jukebox/fetchCurrentlyPlaying',
  async (jukeboxId: number) => {
    return api.getCurrentlyPlaying(jukeboxId)
  },
)

export const thunkFetchNextTracks = createAsyncThunk(
  'jukebox/fetchNextTracks',
  async (payload: { jukeboxId: number; jukeSessionId: number }) => {
    return await api.getQueuedTracks(payload.jukeboxId, payload.jukeSessionId)
  },
)

export const thunkClearNextTracks = createAsyncThunk(
  'jukebox/clearNextTracks',
  async (payload: { jukeboxId: number; jukeSessionId: number }) => {
    await api.clearNextTracks(payload.jukeboxId, payload.jukeSessionId)
  },
)

export const thunkUpdateAccountLink = createAsyncThunk(
  'jukebox/updateActiveLink',
  async (payload: { jukeboxId: number; link: IAccountLink }) => {
    await api.accountLinks.update(
      payload.jukeboxId,
      payload.link.id,
      payload.link,
    )
    return { link: payload.link }
  },
)

export const thunkSyncSpotifyTokens = createAsyncThunk(
  'jukebox/syncSpotifyTokens',
  async (clubId: number) => {
    return await api.getActiveAccountLink(clubId)
  },
)
