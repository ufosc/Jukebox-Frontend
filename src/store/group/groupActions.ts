import { store } from '../store'
import { thunkFetchGroupInfo, thunkFetchGroupSpotifyAuth } from './groupThunks'

export const setCurrentGroup = async (groupId: string) => {
  await store.dispatch(thunkFetchGroupInfo(groupId))
  await store.dispatch(thunkFetchGroupSpotifyAuth(groupId))
}
