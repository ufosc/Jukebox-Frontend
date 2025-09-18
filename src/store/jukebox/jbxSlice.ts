import { createSlice } from '@reduxjs/toolkit'
import { builderDefaults } from 'src/utils'
import {
  thunkCreateAccountLink,
  thunkDeleteAccountLink,
  thunkFetchAccountLinks,
  thunkFetchJukebox,
  thunkFetchJukeboxes,
  thunkFetchJukeSession,
  thunkFetchJukeSessionMembership,
  thunkFetchQueue,
  thunkJoinJukeSession,
  thunkSyncSpotifyTokens,
  thunkUpdateAccountLink,
} from './jbxThunks'

export const jukeboxSlice = createSlice({
  name: 'jukebox',
  initialState: {
    status: 'idle' as StoreStatus,
    error: null as string | null,
    jukeboxes: [] as IJukebox[],
    hasAux: false,
    currentJukebox: null as IJukebox | null,
    currentJukeSession: null as IJukeSession | null,
    currentJukeSessionMembership: null as IJukeSessionMembership | null,
    queue: null as IQueue | null,
    spotifyAuth: null as ISpotifyAccount | null,
    liveProgress: 0 as number | null,
    accountLinks: [] as IAccountLink[],
  },
  reducers: {
    setHasAuxReducer: (state, action: { payload: boolean }) => {
      state.hasAux = action.payload
    },
    setCurrentJukeboxReducer: (state, action: { payload: { id: number } }) => {
      state.currentJukebox =
        state.jukeboxes.find((jukebox) => jukebox.id === action.payload.id) ??
        null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkFetchJukeboxes.fulfilled, (state, action) => {
      if (!action.payload.success) {
        state.jukeboxes = []
        return
      }
      state.jukeboxes = action.payload.data ?? []

      if (state.jukeboxes.length > 0) {
        state.currentJukebox = state.jukeboxes[0]
      }
    })
    builder.addCase(thunkFetchJukeSession.fulfilled, (state, action) => {
      if (!action.payload.success) {
        state.currentJukeSession = null
        state.currentJukeSessionMembership = null
        return
      }
      state.currentJukeSession = action.payload.data
    })
    builder.addCase(
      thunkFetchJukeSessionMembership.fulfilled,
      (state, action) => {
        if (!action.payload.success) {
          state.currentJukeSessionMembership = null
          return
        }
        state.currentJukeSessionMembership = action.payload.data
      },
    )

    builder.addCase(thunkFetchQueue.fulfilled, (state, action) => {
      if (!action.payload.success) {
        state.queue = null
        return
      }

      state.queue = action.payload.data
    })
    builder.addCase(thunkSyncSpotifyTokens.fulfilled, (state, action) => {
      if (!action.payload.success) {
        state.spotifyAuth = null
        return
      }

      state.spotifyAuth = action.payload.data.spotify_account
    })
    builder.addCase(thunkFetchJukebox.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.currentJukebox = action.payload.data
        return
      }
    })
    builder.addCase(thunkFetchAccountLinks.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.accountLinks = action.payload.data
        state.spotifyAuth =
          action.payload.data.find((account) => account.active)
            ?.spotify_account ?? null
        state.error = null
      } else {
        state.error = action.payload.data.message
      }
    })
    builder.addCase(thunkCreateAccountLink.fulfilled, (state, action) => {
      if (action.payload.success) {
        const { data } = action.payload
        state.accountLinks.push(data)
        if (data.active) {
          state.spotifyAuth = data.spotify_account
        }
        state.error = null
      } else {
        state.error = action.payload.data.message
      }
    })
    builder.addCase(thunkUpdateAccountLink.fulfilled, (state, action) => {
      if (action.payload.success) {
        const { data } = action.payload
        state.accountLinks = state.accountLinks.map((accountLink) => {
          if (accountLink.id === data.id) {
            return data
          } else {
            return accountLink
          }
        })

        if (data.active) {
          state.spotifyAuth = data.spotify_account
        }
        state.error = null
      } else {
        state.error = action.payload.data.message
      }
    })
    builder.addCase(thunkDeleteAccountLink.fulfilled, (state, action) => {
      const { res, accountLinkId } = action.payload
      if (res.success) {
        state.accountLinks = state.accountLinks.filter(
          (link) => link.id !== accountLinkId,
        )
        state.error = null
      } else {
        state.error = res.data.message
      }
    })
    builder.addCase(thunkJoinJukeSession.fulfilled, (state, action) => {
      if (!action.payload.success) {
        state.error = action.payload.data.message
        return
      }
      state.currentJukeSessionMembership = action.payload.data
      state.error = null
    }),
      builderDefaults(builder)
  },
})

export type JukeboxState = ReturnType<typeof jukeboxSlice.reducer>
