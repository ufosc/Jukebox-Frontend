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
import { ApiClient } from 'src/api'
import { SpotifyPlayer } from 'src/lib'
import { setHasAux } from 'src/store'
import { KeyboardContext } from '../KeyboardContext'

export const SpotifyPlayerContext = createContext({
  player: null as Spotify.Player | null,
  /** This device is connected for playback */
  deviceIsActive: false,
  /** The player has authenticated with Spotify */
  spotifyIsConnected: false,
  deviceId: '',
  playerState: null as IPlayerAuxState | null,
  nextTrack: () => {},
  prevTrack: () => {},
  play: () => {},
  pause: () => {},
  like: () => {},
  repeat: () => {},
  setProgress: (timeMs: number) => {},
  togglePlay: () => {},
})

export const SpotifyPlayerProvider = (props: {
  children: ReactNode
  token: Nullable<string>
  jukebox: IJukebox | null
  onPlayerStateChange: (state?: IPlayerAuxClientUpdate) => void
}) => {
  const { children, token, jukebox, onPlayerStateChange } = props
  const playerRef = useRef<Spotify.Player | null>(null)
  const networkRef = useRef<ApiClient>()

  const [initialized, setInitialized] = useState(false)
  const [playerState, setPlayerState] = useState<IPlayerAuxState | null>(null)
  const [active, setActive] = useState(false)
  const [deviceId, setDeviceId] = useState('')
  const [connected, setConnected] = useState(false)

  const { onSpace, onArrow } = useContext(KeyboardContext)

  useEffect(() => {
    networkRef.current = ApiClient.getInstance()
  }, [])

  useEffect(() => {
    if (token && jukebox && !playerRef.current) {
      SpotifyPlayer.getInstance(token)
        .getPlayer()
        .then(({ player, deviceId: resDeviceId }) => {
          playerRef.current = player
          setDeviceId(resDeviceId)

          setInitialized(true)
          setConnected(true)
        })
    }
  }, [token])

  // Control the aux value in state
  useEffect(() => {
    if (connected && active) {
      setHasAux(true)
    } else {
      setHasAux(false)
    }
  }, [connected, active])

  // Actions to run when state changes
  const handlePlayerStateChange = (state?: Spotify.PlaybackState) => {
    if (!state || !jukebox) {
      // Spotify returns null state if playback transferred to another device
      setActive(false)
      onPlayerStateChange()

      return
    }

    const { current_track: spotifyTrack } = state.track_window

    console.debug('Player state changed:', state)

    setPlayerState((prev) => {
      return {
        ...prev,
        current_track: spotifyTrack?.id ? spotifyTrack : null,
        progress: state.position,
        is_playing: !state.paused,
      }
    })
    setDeviceId(state.playback_id)

    playerRef.current?.getCurrentState().then((state) => {
      !state ? setActive(false) : setActive(true)
      return state
    })
  }

  useEffect(() => {
    if (initialized && jukebox !== null) {
      // When changed event is emitted, update state with the current track
      playerRef.current?.addListener(
        'player_state_changed',
        handlePlayerStateChange,
      )
      playerRef.current?.addListener('authentication_error', () => {
        console.error('Spotify Auth Error')
      })

      playerRef.current?.addListener('playback_error', () => {
        // Happens if trying to play from browser after playback transferred away
        setActive(false)
      })
      playerRef.current?.addListener('not_ready', () => {
        setActive(false)
        setConnected(false)
      })
      playerRef.current?.addListener('account_error', () => {
        console.error('Spotify Account Error')
        setActive(false)
        setConnected(false)
      })
      playerRef.current?.addListener('initialization_error', () => {
        setActive(false)
        setConnected(false)
      })
      playerRef.current?.addListener('ready', () => {
        setConnected(true)
      })

      return () =>
        playerRef.current?.removeListener(
          'player_state_changed',
          handlePlayerStateChange,
        )
    }
  }, [initialized, jukebox, onPlayerStateChange, playerRef])

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
        deviceId,
        spotifyIsConnected: connected,
        playerState,
        nextTrack,
        prevTrack: prevTrack,
        play,
        pause,
        like,
        repeat,
        setProgress: setTimeProgress,
        togglePlay,
      }}
    >
      {children}
    </SpotifyPlayerContext.Provider>
  )
}
