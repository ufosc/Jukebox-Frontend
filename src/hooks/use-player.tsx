import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { SpotifyPlayerContext } from 'src/context'
import { selectHasJukeboxAux, selectPlayerState } from 'src/store'

interface Player {
  hasAux: boolean
  playerState: IPlayerState | null
  auxPlayerState: IPlayerAuxState | null
  play: () => void
  pause: () => void
  togglePlay: () => void
  setProgress: (progressMs: number) => void
  nextTrack: () => void
  prevTrack: () => void
  like: () => void
  repeat: () => void
}

/**
 * Access player controls.
 *
 * If Spotify is connected, it will use spotify's controls,
 * otherwise will use the REST api to control the spotify state.
 */
export const usePlayer = (): Player => {
  /*== Get state from aux ==*/
  const hasAux = useSelector(selectHasJukeboxAux)
  const {
    play: auxPlay,
    pause: auxPause,
    togglePlay: auxTogglePlay,
    setProgress: auxSetProgress,
    nextTrack: auxNextTrack,
    prevTrack: auxPrevTrack,
    like: auxLike,
    repeat: auxRepeat,
    playerState: auxPlayerState,
  } = useContext(SpotifyPlayerContext)

  /*== Get state from API ==*/
  const storePlayerState = useSelector(selectPlayerState)

  // TODO: Implement api controls

  return {
    hasAux,
    playerState: storePlayerState,
    auxPlayerState,
    play: () => {},
    pause: () => {},
    togglePlay: () => {},
    setProgress: (timeMs: number) => {},
    nextTrack: () => {},
    prevTrack: () => {},
    like: () => {},
    repeat: () => {},
  }
}
