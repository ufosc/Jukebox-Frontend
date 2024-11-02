import { store } from '../store'
import { trackSlice } from './trackSlice'

const { setCurrentTrackReducer, setNextTracksReducer } = trackSlice.actions

export const setCurrentTrack = (track: Nullable<ITrack>) => {
  store.dispatch(setCurrentTrackReducer(track))
}

export const setNextTracks = (tracks: ITrack[]) => {
  store.dispatch(setNextTracksReducer(tracks))
}
