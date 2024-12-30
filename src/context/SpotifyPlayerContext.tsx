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
import { setHasAux } from 'src/store'
import { KeyboardContext } from './KeyboardContext'

export const SpotifyPlayerContext = createContext({
  player: null as Spotify.Player | null,
  /** This device is connected for playback */
  deviceIsActive: false,
  /** The player has authenticated with Spotify */
  spotifyIsConnected: false,

  playerState: null as IPlayerState | null,
  nextTracks: [] as Spotify.Track[],
  nextTrack: () => {},
  prevTrack: () => {},
  play: () => {},
  pause: () => {},
  like: () => {},
  repeat: () => {},
  togglePlay: () => {},
  connectDevice: () => {},
  setProgress: (timeMs: number) => {},
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
}) => {
  const { children, token, jukebox, onPlayerStateChange } = props
  const playerRef = useRef<Spotify.Player | null>(null)
  const networkRef = useRef<Network>()

  const [initialized, setInitialized] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Spotify.Track | null>(null)
  const [paused, setPaused] = useState(true)
  const [active, setActive] = useState(false)
  const [progress, setProgress] = useState(0)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [nextTracks, setNextTracks] = useState<Spotify.Track[]>([])
  const [deviceId, setDeviceId] = useState('')
  const [connected, setConnected] = useState(false)

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
          setConnected(true)
        })
    }
  }, [token])

  useEffect(() => {
    console.log('Current track:', currentTrack)
  }, [currentTrack])

  // Control the aux value in state
  useEffect(() => {
    if (connected && active) {
      setHasAux(true)
    } else {
      setHasAux(false)
    }
  }, [connected, active])

  const handlePlayerStateChange = (state?: Spotify.PlaybackState) => {
    if (!state) {
      // Spotify returns null state if playback transferred to another device
      setActive(false)
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

      playerRef.current?.addListener('playback_error', () => {
        // Happens if trying to play from browser after playback transferred away
        setActive(false)
      })
      playerRef.current?.addListener('not_ready', () => {
        setActive(false)
        setConnected(false)
      })
      playerRef.current?.addListener('account_error', () => {
        setActive(false)
        setConnected(false)
      })
      playerRef.current?.addListener('initialization_error', () => {
        setActive(false)
        setConnected(false)
      })
      playerRef.current?.addListener('ready', () => {
        setActive(false)
        setConnected(true)
      })

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
  const prevTrack = () => {
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
  const like = () => {
    console.log('TODO: Like Track')
  }
  const repeat = () => {
    console.log('TODO: Repeat Track')
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
        deviceIsActive: active,
        spotifyIsConnected: connected,
        playerState: {
          is_playing: !paused,
          jukebox_id: jukebox?.id,
          progress: progress,
          current_track: currentTrack ?? undefined,
        },
        nextTracks,
        nextTrack,
        prevTrack: prevTrack,
        play,
        pause,
        like,
        repeat,
        togglePlay,
        connectDevice,
        setProgress: setTimeProgress,
      }}
    >
      {children}
    </SpotifyPlayerContext.Provider>
  )
}
