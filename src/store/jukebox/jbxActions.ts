import { store } from '../store'
import { thunkFetchJukeboxes } from './jbxThunks'

export const fetchJukeboxes = async () => {
  await store.dispatch(thunkFetchJukeboxes())
}
