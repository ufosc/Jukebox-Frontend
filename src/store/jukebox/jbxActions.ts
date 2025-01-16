import { store } from '../store'
import { thunkFetchJukeboxes } from './jbxThunks'

export const fetchJukeboxes = async () => {
  await store.dispatch(thunkFetchJukeboxes())
}


export const setCurrentJukebox = async () => {
  //needs to store the current jukebox (state.currentJukebox) here to local storage
  
}