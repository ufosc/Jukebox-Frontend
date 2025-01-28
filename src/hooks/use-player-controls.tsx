import { useContext } from 'react'
import { SpotifyPlayerContext } from 'src/context'

/**
 * Access player controls.
 *
 * If Spotify is connected, it will use spotify's controls,
 * otherwise will use the REST api to control the spotify state.
 */
export const usePlayerControls = () => {
  const {
    play,
    pause,
    togglePlay,
    setProgress,
    nextTrack,
    prevTrack,
    like,
    repeat,
  } = useContext(SpotifyPlayerContext)

  // TODO: Implement api controls

  return {
    play,
    pause,
    togglePlay,
    setProgress,
    nextTrack,
    prevTrack,
    like,
    repeat,
  }
}
