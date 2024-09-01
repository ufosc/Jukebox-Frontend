import { userSlice } from './userSlice'

export * from './userActions'
export * from './userSelectors'

export const { reducer: userReducer, actions: userActions } = userSlice
