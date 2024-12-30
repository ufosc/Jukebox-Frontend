import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectPlayerState } from 'src/store'
import { SpotifyPlayerContext } from './SpotifyPlayerContext'

export const CurrentlyPlayingContext = createContext({
  currentTrack: null as ITrack | null,
  liveProgress: null as number | null,
  playerState: null as IPlayerState | null,
  play: () => {},
  pause: () => {},
  setProgress: (ms: number) => {},
  nextTrack: () => {},
  prevTrack: () => {},
  togglePlay: () => {},
  like: () => {},
  repeat: () => {},
})

export const CurrentlyPlayingProvider = (props: { children?: ReactNode }) => {
  const storePlayerState = useSelector(selectPlayerState)

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [playerState, setPlayerState] = useState<IPlayerState | null>(null)
  const [liveProgress, setLiveProgress] = useState<number | null>(0)

  const clearTimer = () => {
    if (timer) {
      clearInterval(timer)
    }
  }

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
    console.log('Currently playing state changed')
    setLiveProgress(playerState?.progress ?? null)

    if (timer) clearInterval(timer)

    if (playerState?.is_playing) {
      const t = setInterval(() => {
        setLiveProgress((prev) => (prev && prev + 1000) || 0)
      }, 1000)

      setTimer(t)
    }
  }, [
    playerState?.current_track,
    playerState?.is_playing,
    playerState?.progress,
  ])

  useEffect(() => {
    if (spotifyPlayerState?.current_track) {
      setPlayerState(spotifyPlayerState)
    } else {
      setPlayerState(storePlayerState)
    }
  }, [
    spotifyPlayerState?.current_track?.id,
    spotifyPlayerState?.is_playing,
    spotifyPlayerState?.progress,
    storePlayerState?.current_track?.id,
    storePlayerState?.is_playing,
    storePlayerState?.progress,
  ])

  return (
    <CurrentlyPlayingContext.Provider
      value={{
        liveProgress,
        currentTrack: playerState?.current_track ?? null,
        playerState,
        play,
        pause,
        setProgress,
        nextTrack,
        prevTrack,
        togglePlay,
        like,
        repeat,
      }}
    >
      {props.children}
    </CurrentlyPlayingContext.Provider>
  )
}
