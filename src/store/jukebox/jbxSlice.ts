import { createSlice } from '@reduxjs/toolkit'
import { builderDefaults } from 'src/utils'
import { thunkFetchJukeboxes } from './jbxThunks'

export const jukeboxSlice = createSlice({
  name: 'jukebox',
  initialState: {
    status: 'idle' as StoreStatus,
    error: null as string | null,
    jukeboxes: [] as IJukebox[],
    currentJukebox: null as IJukebox | null,
  },
  reducers: {
    setCurrentJukeboxReducer: (state, action:{payload:{jukebox : IJukebox}}) =>{
      state.currentJukebox = action.payload.jukebox;
    },


  },
  extraReducers: (builder) => {
    builder.addCase(thunkFetchJukeboxes.fulfilled, (state, action) => {
      state.jukeboxes = action.payload

      if (action.payload.length > 0) {
        state.currentJukebox = action.payload[0]
      }
    })

    builderDefaults(builder)
  },
})

export type JukeboxState = ReturnType<typeof jukeboxSlice.reducer>
