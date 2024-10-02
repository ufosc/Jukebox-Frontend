import { store } from '../store'
import { selectCurrentGroup } from './groupSelectors'
import { groupSlice } from './groupSlice'
import { thunkFetchGroupInfo, thunkFetchGroupSpotifyAuth } from './groupThunks'

const { setAllGroupsReducer, setCurrentGroupReducer } = groupSlice.actions

export const fetchCurrentGroupInfo = async () => {
  const group = selectCurrentGroup(store.getState())
  if (!group) return

  await store.dispatch(thunkFetchGroupInfo(group.id))
  await store.dispatch(thunkFetchGroupSpotifyAuth(group.id))
}

export const setCurrentGroup = (group: IGroup) => {
  store.dispatch(setCurrentGroupReducer(group))
}

export const setAllGroups = (groups: IGroup[]) => {
  store.dispatch(setAllGroupsReducer(groups))
}
