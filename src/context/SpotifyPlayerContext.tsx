/**
 * Controls connection with spotify.
 *
 * Inspired by:
 * https://github.com/niekert/use-spotify-web-playback-sdk/blob/master/src/index.ts#L24
 */
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { SpotifyPlayer } from 'src/lib'
import { Network } from 'src/network'
import { KeyboardContext } from './KeyboardContext'

export const SpotifyPlayerContext = createContext({
  player: null as Nullable<Spotify.Player>,
  isPlaying: false,
  isActive: false,
  isConnected: false,
  currentTrack: null as Nullable<Spotify.Track>,
  progress: 0,
  duration: 0,
  nextTracks: [] as Spotify.Track[],
  nextTrack: () => {},
  previousTrack: () => {},
  play: () => {},
  pause: () => {},
  togglePlay: () => {},
  connectDevice: () => {},
  setTimeProgress: (timeMs: number) => {},
})

export const SpotifyPlayerProvider = (props: {
  children: ReactNode
  token: Nullable<string>
  jukebox: IJukebox | null
  onPlayerStateChange: (state: {
    currentTrack: ITrack
    position: number
    isPlaying: boolean
    nextTracks: ITrack[]
  }) => void
  // emitMessage: (ev: string, message: any) => void
}) => {
  const { children, token, jukebox, onPlayerStateChange } = props
  const playerRef = useRef<Nullable<Spotify.Player>>()
  const networkRef = useRef<Network>()

  const [initialized, setInitialized] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Nullable<Spotify.Track>>()
  const [paused, setPaused] = useState(true)
  const [active, setActive] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [timer, setTimer] = useState<Nullable<NodeJS.Timeout>>()
  const [nextTracks, setNextTracks] = useState<Spotify.Track[]>([])
  const [deviceId, setDeviceId] = useState('')

  const { onSpace, onArrow } = useContext(KeyboardContext)

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
    if (token && jukebox) {
      SpotifyPlayer.getInstance(token)
        .getPlayer()
        .then(async ({ player, deviceId: resDeviceId }) => {
          playerRef.current = player
          setDeviceId(resDeviceId)

          setInitialized(true)

          // When successfully connected, transfer playback
          await networkRef.current?.connectSpotifyDevice(
            jukebox.id,
            resDeviceId,
          )
        })
    }
  }, [token])

  useEffect(() => {
    console.log('Current track:', currentTrack)
  }, [currentTrack])

  const handlePlayerStateChange = (state?: Spotify.PlaybackState) => {
    if (!state) {
      return
    }
    const { current_track: spotifyTrack } = state.track_window
    onPlayerStateChange({
      currentTrack: spotifyTrack,
      position: state.position,
      isPlaying: !state.paused,
      nextTracks: state.track_window.next_tracks,
    })
    setCurrentTrack(spotifyTrack)
    setPaused(state.paused)
    setProgress(state.position)
    setDuration(state.duration)
    setNextTracks(state.track_window.next_tracks)
    setDeviceId(state.playback_id)

    playerRef.current?.getCurrentState().then((state) => {
      !state ? setActive(false) : setActive(true)
    })
  }

  useEffect(() => {
    if (initialized && jukebox !== null) {
      // When changed event is emitted, update state with the current track
      playerRef.current?.addListener(
        'player_state_changed',
        handlePlayerStateChange,
      )

      return () =>
        playerRef.current?.removeListener(
          'player_state_changed',
          handlePlayerStateChange,
        )
    }
  }, [initialized, jukebox, onPlayerStateChange])

  const nextTrack = () => {
    playerRef.current?.nextTrack()
  }
  const previousTrack = () => {
    playerRef.current?.previousTrack()
  }
  const play = () => {
    playerRef.current?.resume()
  }
  const pause = () => {
    playerRef.current?.pause()
  }
  const togglePlay = () => {
    playerRef.current?.togglePlay()
  }

  const connectDevice = async () => {
    if (jukebox) {
      await networkRef.current?.connectSpotifyDevice(jukebox.id, deviceId)
    }
  }

  const setTimeProgress = (timeMs: number) => {
    playerRef.current?.seek(timeMs)
  }

  /**
   * Get player asynchronously, from a global context.
   * This is needed for functions that reference
   * the player in another context/thread - like
   * the global keybindings.
   */
  const getPlayerAsync = async () => {
    const player = SpotifyPlayer.getInstance()
    const currentPlayer = await player?.getPlayer()
    return currentPlayer?.player
  }

  /**===================*
   * Player Keybindings *
   *====================*/
  onSpace(async () => {
    const player = await getPlayerAsync()
    player?.togglePlay()
  })

  onArrow('right', async () => {
    const player = await getPlayerAsync()
    player?.nextTrack()
  })

  onArrow('left', async () => {
    const player = await getPlayerAsync()
    player?.previousTrack()
  })

  return (
    <SpotifyPlayerContext.Provider
      value={{
        player: playerRef.current,
        currentTrack,
        isPlaying: !paused,
        isActive: active,
        isConnected: initialized,
        progress,
        duration,
        nextTracks,
        nextTrack,
        previousTrack,
        play,
        pause,
        togglePlay,
        connectDevice,
        setTimeProgress,
      }}
    >
      {children}
    </SpotifyPlayerContext.Provider>
  )
}
