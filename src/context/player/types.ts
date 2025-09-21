export interface PlayerControls {
  play: () => void
  pause: () => void
  // togglePlay: () => void
  setProgress: (progressMs: number) => void
  nextTrack: () => void
  prevTrack: () => void
  like: () => void
  repeat: () => void
  togglePlay: () => void
}
