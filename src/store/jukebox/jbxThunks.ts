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

export const thunkFetchQueue = createAsyncThunk(
  'jukebox/fetchNextTracks',
  async (payload: { jukeboxId: number; jukeSessionId: number }) => {
    return await api.getQueuedTracks(payload.jukeboxId, payload.jukeSessionId)
  },
)

export const thunkFetchJukeSession = createAsyncThunk(
  'jukebox/fetchJukeSession',
  async (payload: { jukeboxId: number }) => {
    return await api.getCurrentJukeSession(payload.jukeboxId)
  },
)

export const thunkFetchJukeSessionMembership = createAsyncThunk(
  'jukebox/fetchJukeSessionMembership',
  async (payload: { jukeboxId: number; jukeSessionId: number }) => {
    return await api.getJukeSessionMembership(
      payload.jukeboxId,
      payload.jukeSessionId,
    )
  },
)

export const thunkJoinJukeSession = createAsyncThunk(
  'jukebox/joinJukeSession',
  async (payload: {
    jukeboxId: number
    jukeSessionId: number
    userId: number
  }) => {
    return await api.joinJukeSession(
      payload.jukeboxId,
      payload.jukeSessionId,
      payload.userId,
    )
  },
)

export const thunkClearNextTracks = createAsyncThunk(
  'jukebox/clearNextTracks',
  async (payload: { jukeboxId: number; jukeSessionId: number }) => {
    await api.clearNextTracks(payload.jukeboxId, payload.jukeSessionId)
  },
)

export const thunkFetchAccountLinks = createAsyncThunk(
  'jukebox/fetchAccountLink',
  async (payload: { jukeboxId: number }) => {
    return await api.accountLinks.list(payload.jukeboxId)
  },
)

export const thunkCreateAccountLink = createAsyncThunk(
  'jukebox/createActiveLink',
  async (payload: { jukeboxId: number; link: IAccountLinkCreate }) => {
    return await api.accountLinks.create(payload.jukeboxId, payload.link)
  },
)

export const thunkUpdateAccountLink = createAsyncThunk(
  'jukebox/updateActiveLink',
  async (payload: {
    jukeboxId: number
    accountLinkId: number
    body: IAccountLinkUpdate
  }) => {
    return await api.accountLinks.update(
      payload.jukeboxId,
      payload.accountLinkId,
      payload.body,
    )
  },
)

export const thunkDeleteAccountLink = createAsyncThunk(
  'jukebox/deleteAccountLink',
  async (payload: { jukeboxId: number; accountLinkId: number }) => {
    const res = await api.accountLinks.delete(
      payload.jukeboxId,
      payload.accountLinkId,
    )

    return { res, accountLinkId: payload.accountLinkId }
  },
)

export const thunkSyncSpotifyTokens = createAsyncThunk(
  'jukebox/syncSpotifyTokens',
  async (clubId: number) => {
    return await api.getActiveAccountLink(clubId, true)
  },
)
