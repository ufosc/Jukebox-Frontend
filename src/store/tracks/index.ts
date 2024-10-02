import { trackSlice } from "./tracksSlice";

export * from './tracksActions';
export * from './tracksSelectors';

export const { reducer: trackReducer, actions: trackActions } = trackSlice