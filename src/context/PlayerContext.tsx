/**
 * Controls connection with spotify.
 *
 * Inspired by:
 * https://github.com/niekert/use-spotify-web-playback-sdk/blob/master/src/index.ts#L24
 */
import {
  createContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { SpotifyPlayer } from 'src/lib'

export const SpotifyPlayerContext = createContext({
  player: null as Nullable<Spotify.Player>,
  isPlaying: false,
  playerActive: false,
  currentTrack: null as Nullable<Spotify.Track>,
  progress: 0,
  duration: 0,
  nextTrack: () => {},
  previousTrack: () => {},
  pause: () => {},
  togglePlay: () => {},
})

export const SpotifyPlayerProvider = (props: {
  children: ReactNode
  token: Nullable<string>
}) => {
  const { children, token } = props
  const [initialized, setInitialized] = useState(false)
  const playerRef = useRef<Nullable<Spotify.Player>>()
  const [currentTrack, setCurrentTrack] = useState<Nullable<Spotify.Track>>()
  const [paused, setPaused] = useState(true)
  const [active, setActive] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [timer, setTimer] = useState<Nullable<NodeJS.Timeout>>()

  useEffect(() => {
    if (timer) {
      clearInterval(timer)
    }

    if (!paused) {
      const t = setInterval(() => {
        setProgress((prev) => prev + 1000)
      }, 1000)

      setTimer(t)
    }
  }, [paused])

  useEffect(() => {
    if (token) {
      SpotifyPlayer.getInstance(token)
        .getPlayer()
        .then((player) => {
          playerRef.current = player
          setInitialized(true)
        })
    }
  }, [token])

  useEffect(() => {
    // When changed event is emitted, update state with the current track
    playerRef.current?.addListener('player_state_changed', (state) => {
      if (!state) {
        return
      }

      setCurrentTrack(state.track_window.current_track)
      setPaused(state.paused)
      setProgress(state.position)
      setDuration(state.duration)

      playerRef.current?.getCurrentState().then((state) => {
        !state ? setActive(false) : setActive(true)
      })
    })
  }, [initialized])

  const nextTrack = () => {
    playerRef.current?.nextTrack()
  }
  const previousTrack = () => {
    playerRef.current?.previousTrack()
  }
  const pause = () => {
    playerRef.current?.pause()
  }
  const togglePlay = () => {
    playerRef.current?.togglePlay()
  }

  return (
    <SpotifyPlayerContext.Provider
      value={{
        player: playerRef.current,
        currentTrack,
        isPlaying: !paused,
        playerActive: active,
        progress,
        duration,
        nextTrack,
        previousTrack,
        pause,
        togglePlay,
      }}
    >
      {children}
    </SpotifyPlayerContext.Provider>
  )
}
