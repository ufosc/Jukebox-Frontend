import { trackSlice } from './trackSlice'

export * from './trackActions'
export * from './trackSelectors'

export const { reducer: trackReducer, actions: trackActions } = trackSlice
