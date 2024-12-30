import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SpotifyPlayerContext } from 'src/context'
import { selectHasJukeboxAux, selectPlayerState } from 'src/store'
import { AudioPlayer } from './AudioPlayer'

/**
 * Stateful audio player.
 *
 * Takes in no props, instead will access global store
 * and context to choose which player settings to use.
 */
export const ConnectedPlayer = () => {
  const storePlayerState = useSelector(selectPlayerState)
  const hasAux = useSelector(selectHasJukeboxAux)

  const [playerState, setPlayerState] = useState<IPlayerState | null>(null)

  const {
    playerState: spotifyPlayerState,
    play,
    pause,
    togglePlay,
    setProgress,
    nextTrack,
    prevTrack,
    like,
    repeat,
  } = useContext(SpotifyPlayerContext)

  useEffect(() => {
    if (spotifyPlayerState) {
      setPlayerState(spotifyPlayerState)
    } else {
      setPlayerState(storePlayerState)
    }
  }, [spotifyPlayerState, storePlayerState])

  return (
    (playerState && (
      <AudioPlayer
        playerState={playerState}
        disableControls={!hasAux}
        play={play}
        pause={pause}
        togglePlay={togglePlay}
        setProgress={setProgress}
        nextTrack={nextTrack}
        prevTrack={prevTrack}
        like={like}
        repeat={repeat}
      />
    )) || <p>No Audio Connected</p>
  )
}
