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
import { Network } from 'src/network'

export const SpotifyPlayerContext = createContext({
  player: null as Nullable<Spotify.Player>,
  isPlaying: false,
  playerActive: false,
  currentTrack: null as Nullable<Spotify.Track>,
  progress: 0,
  duration: 0,
  nextTracks: [] as Spotify.Track[],
  nextTrack: () => {},
  previousTrack: () => {},
  pause: () => {},
  togglePlay: () => {},
  connectDevice: (jukeboxId: number) => {},
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
  const [nextTracks, setNextTracks] = useState<Spotify.Track[]>([])
  const [deviceId, setDeviceId] = useState('')
  const networkRef = useRef<Network>()

  useEffect(() => {
    networkRef.current = Network.getInstance()
  }, [])

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
        .then(({ player, deviceId: resDeviceId }) => {
          playerRef.current = player
          setDeviceId(resDeviceId)

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
      setNextTracks(state.track_window.next_tracks)
      setDeviceId(state.playback_id)

      if (state.position === 0) {
        console.log('Starting new track...')
      }

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

  const connectDevice = async (jukeboxId: number) => {
    await networkRef.current?.connectSpotifyDevice(jukeboxId, deviceId)
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
        nextTracks,
        nextTrack,
        previousTrack,
        pause,
        togglePlay,
        connectDevice,
      }}
    >
      {children}
    </SpotifyPlayerContext.Provider>
  )
}
