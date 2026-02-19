/**
 * Controls connection with spotify.
 *
 * Inspired by:
 * https://github.com/niekert/use-spotify-web-playback-sdk/blob/master/src/index.ts#L24
 */
import {
  createContext,
  useCallback,
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
import { parseTrackObj } from './utils'

export const SpotifyPlayerContext = createContext({
  player: null as Spotify.Player | null,
  /** This device is connected for playback */
  deviceIsActive: false,
  /** The player has authenticated with Spotify */
  spotifyIsConnected: false,
  /** This device has AUX (connected + active) */
  hasAux: false,
  deviceId: '',
  playerState: null as IPlayerAuxState | null,
  nextTrack: () => {},
  prevTrack: () => {},
  play: () => {},
  pause: () => {},
  like: () => {},
  repeat: () => {},
  setProgress: (_timeMs: number) => {},
  togglePlay: () => {},
  getCurrentPosition: async(): Promise<number | null> => null,
})

export const SpotifyPlayerProvider = (props: {
  children: ReactNode
  token: Nullable<string>
  jukebox: IJukebox | null
  onPlayerStateChange: (state?: IPlayerAuxUpdate) => void
}) => {
  const { children, token, jukebox, onPlayerStateChange } = props
  const playerRef = useRef<Spotify.Player | null>(null)
  const networkRef = useRef<ApiClient>()

  const [initialized, setInitialized] = useState(false)
  const [playerState, setPlayerState] = useState<IPlayerAuxState | null>(null)
  const [active, setActive] = useState(false)
  const [deviceId, setDeviceId] = useState('')
  const [connected, setConnected] = useState(false)

  // Keep a ref to jukebox so handlePlayerStateChange always reads the latest
  // value without needing to be recreated (which would cause listener churn).
  const jukeboxRef = useRef(jukebox)
  useEffect(() => {
    jukeboxRef.current = jukebox
  }, [jukebox])

  // Keep a ref to onPlayerStateChange for the same reason.
  const onPlayerStateChangeRef = useRef(onPlayerStateChange)
  useEffect(() => {
    onPlayerStateChangeRef.current = onPlayerStateChange
  }, [onPlayerStateChange])

  const { onSpace, onArrow } = useContext(KeyboardContext)

  useEffect(() => {
    networkRef.current = ApiClient.getInstance()
  }, [])

  // Initialize the Spotify player when a token and jukebox are available
  useEffect(() => {
    if (!token) {
      return
    }

    SpotifyPlayer.getInstance(token)
      .getPlayer()
      .then(({ player, deviceId: resDeviceId }) => {

        playerRef.current = player
        setDeviceId(resDeviceId)
        setInitialized(true)
        setConnected(true)
        //if (jukebox) {
        //  networkRef.current?.connectPlayerDevice(jukebox.id, resDeviceId)
        //}
      })
      //.catch((error) => {
      //  console.error('[SpotifyPlayerProvider] Failed to initialize player:', error)
      //  setConnected(false)
      //})
  }, [token])

  // Sync aux state whenever active/connected/jukebox changes.
  // Depends on jukebox because setHasAux bails early if jukeboxId isn't
  // in the store yet — adding jukebox here ensures we retry once it arrives.
  useEffect(() => {
    setHasAux(connected && active)
  }, [connected, active, jukebox])

  
  const handlePlayerStateChange = useCallback(
    (state?: Spotify.PlaybackState) => {
      const currentJukebox = jukeboxRef.current

      if (!state || !currentJukebox) {
        // Spotify returns null state when playback transfers to another device
        setActive(false)
        onPlayerStateChangeRef.current?.()
        return
      }

      const { current_track: spotifyTrack } = state.track_window

      console.debug('[SpotifyPlayerProvider] Player state changed:', state)

      // Directly set progress from SDK — this also resets the local ticker
      // to the correct position, preventing the "bar goes crazy" bug on reconnect.
      setPlayerState({
        current_track: spotifyTrack?.id ? spotifyTrack : null,
        progress: state.position,
        is_playing: !state.paused,
      })

      setDeviceId(state.playback_id)

      // Check if this device is still the active one
      playerRef.current?.getCurrentState().then((currentState) => {
        setActive(!!currentState)
      })

      // Forward the state update to the backend via the socket
      onPlayerStateChangeRef.current?.({
        jukebox_id: currentJukebox.id,
        action: state.paused ? 'paused' : 'played',
        progress: state.position,
        spotify_track: spotifyTrack?.id ? parseTrackObj(spotifyTrack) : undefined,
        timestamp: new Date(),
      })
    },
    // No deps — reads jukebox and onPlayerStateChange through stable refs
    [],
  )

  // Add/remove Spotify SDK listeners when the player is ready.
  // Now only depends on [initialized] since handlePlayerStateChange is stable.
  useEffect(() => {
    if (!initialized || !playerRef.current) return

    const player = playerRef.current

    player.addListener('player_state_changed', handlePlayerStateChange)

    player.addListener('ready', () => {
      setConnected(true)
    })

    player.addListener('not_ready', () => {
      setActive(false)
      setConnected(false)
    })

    player.addListener('authentication_error', () => {
      console.error('[Spotify] Auth Error')
    })

    player.addListener('account_error', () => {
      console.error('[Spotify] Account Error')
      setActive(false)
      setConnected(false)
    })

    player.addListener('initialization_error', () => {
      setActive(false)
      setConnected(false)
    })

    player.addListener('playback_error', () => {
      // Happens when trying to play from browser after playback transferred away
      setActive(false)
    })

    return () => {
      player.removeListener('player_state_changed', handlePlayerStateChange)
      player.removeListener('ready')
      player.removeListener('not_ready')
      player.removeListener('authentication_error')
      player.removeListener('account_error')
      player.removeListener('initialization_error')
      player.removeListener('playback_error')
    }
  }, [initialized, handlePlayerStateChange])

  // ── Controls ──────────────────────────────────────────────────────────────
  // These call playerRef.current directly so they always use the latest player.

  const nextTrack = useCallback(() => {
    playerRef.current?.nextTrack()
  }, [])

  const prevTrack = useCallback(() => {
    playerRef.current?.previousTrack()
  }, [])

  const play = useCallback(() => {
    playerRef.current?.resume()
  }, [])

  const pause = useCallback(() => {
    playerRef.current?.pause()
  }, [])

  const togglePlay = useCallback(() => {
    playerRef.current?.togglePlay()
  }, [])

  const like = useCallback(() => {
    console.log('TODO: Like Track')
  }, [])

  const repeat = useCallback(() => {
    console.log('TODO: Repeat Track')
  }, [])

  const setTimeProgress = useCallback((timeMs: number) => {
    playerRef.current?.seek(timeMs)
  }, [])

  /**
   * Get player asynchronously from the singleton.
   * Used for keybindings which run outside the React render cycle.
   */
  const getPlayerAsync = useCallback(async () => {
    const spotifyPlayer = SpotifyPlayer.getInstance()
    const context = await spotifyPlayer?.getPlayer()
    return context?.player
  }, [])

  // ── Keybindings ──────────────────────────────────────────────────────────
  // Must be inside useEffect so they only register once, not on every render.
  useEffect(() => {
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
  }, [onSpace, onArrow, getPlayerAsync])



  const getCurrentPosition = useCallback(async () => {
    const state = await playerRef.current?.getCurrentState()
    return state?.position ?? null
  }, [])


  return (
    <SpotifyPlayerContext.Provider
      value={{
        player: playerRef.current,
        deviceIsActive: active,
        deviceId,
        hasAux: connected && active,
        spotifyIsConnected: connected,
        playerState,
        nextTrack,
        prevTrack,
        play,
        pause,
        like,
        repeat,
        setProgress: setTimeProgress,
        togglePlay,
        getCurrentPosition,
      }}
    >
      {children}
    </SpotifyPlayerContext.Provider>
  )
}
