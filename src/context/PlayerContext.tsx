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
import { debounce } from 'src/utils'

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
  onTrackChange: (newTrack: ITrack, prevTrack?: ITrack) => void
  // emitMessage: (ev: string, message: any) => void
}) => {
  const { children, token, jukebox, onTrackChange } = props
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
  // const [jukeboxId, setJukeboxId] = useState<number | undefined>()
  const networkRef = useRef<Network>()

  useEffect(() => {
    networkRef.current = Network.getInstance()
  }, [])

  // useEffect(() => {
  //   setJukeboxId(jukebox?.id)
  //   console.log('jukebox:', jukebox)
  // }, [jukebox])

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
    console.log('Current track:', currentTrack)
  }, [currentTrack])

  const onPlayerStateChange = (state?: Spotify.PlaybackState) => {
    if (!state) {
      return
    }
    const { current_track: spotifyTrack } = state.track_window

    setCurrentTrack((prev) => {
      if ((prev?.id !== spotifyTrack?.id && !paused) || !prev) {
        console.log('Setting current track:', spotifyTrack)
        debounce(() => {
          onTrackChange(spotifyTrack, prev ?? undefined)
        })
      }
      return spotifyTrack
    })
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
        onPlayerStateChange,
      )

      return () =>
        playerRef.current?.removeListener(
          'player_state_changed',
          onPlayerStateChange,
        )
    }
  }, [initialized, jukebox, onTrackChange])

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
