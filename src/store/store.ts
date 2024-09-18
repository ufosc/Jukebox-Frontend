import { configureStore } from '@reduxjs/toolkit'
import { groupReducer } from './group'
import { userReducer } from './user'

export const store = configureStore({
  reducer: {
    user: userReducer,
    group: groupReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
