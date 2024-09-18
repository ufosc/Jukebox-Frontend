import { store } from '../store'
import { thunkFetchGroupSpotifyAuth } from './groupThunks'

const setCurrentGroup = async (groupId: string) => {
  await store.dispatch(thunkFetchGroupSpotifyAuth(groupId))
}
