import { createSlice } from '@reduxjs/toolkit'


export const trackSlice = createSlice({
    name: 'track',
    initialState: {
        currentTrack: null as Spotify.Track | null,
        nextTracks: [] as Spotify.Track[],
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase()

    }
})

export type TrackState = ReturnType<typeof trackSlice.reducer>