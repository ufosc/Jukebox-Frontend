import { configureStore } from '@reduxjs/toolkit'
import { clubReducer } from './club'
import { userReducer } from './user'

export const store = configureStore({
  reducer: {
    user: userReducer,
    club: clubReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
