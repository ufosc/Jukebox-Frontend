import type { ActionReducerMapBuilder } from '@reduxjs/toolkit'

export const builderDefaults = (
  builder: ActionReducerMapBuilder<{
    status: StoreStatus
    error: string | null
  }>,
) => {
  builder.addMatcher(
    (action) => action.type.endsWith('/pending'),
    (state) => {
      state.status = 'loading'
    },
  )
  builder.addMatcher(
    (action) => action.type.endsWith('/rejected'),
    (state, action: any) => {
      state.status = 'failed'
      state.error = action.error.message || null
    },
  )
  builder.addMatcher(
    (action) => action.type.endsWith('/fulfilled'),
    (state) => {
      state.status = 'succeeded'
      state.error = null
    },
  )
}
