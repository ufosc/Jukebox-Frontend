/* Player context */
import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useSelector } from 'react-redux'
import { ApiClient } from 'src/api'
import {
  selectCurrentJukebox,
  selectCurrentJukeSession,
} from 'src/store'
import { ActionType } from 'src/types/jukebox-enums'
import { NotImplementedError } from 'src/utils'
import { SocketContext } from '../SocketContext'
import { SpotifyPlayerContext } from './SpotifyPlayerContext'
import { PlayerControls } from './types'
import { parseTrackObj } from './utils'

interface Player extends PlayerControls {
  hasAux: boolean
  accountConnected: boolean
  playerState: IPlayerState | null
  liveProgress: number | null
  playerError: string | null
  currentTrack: ITrack | null
  connectDevice: () => Promise<void>
}

export const PlayerContext = createContext({} as Player)

export const PlayerProvider = (props: { children: ReactNode }) => {
  const api = ApiClient.getInstance()

  const [playerState, setPlayerState] = useState<IPlayerState | null>(null)
  const jukebox = useSelector(selectCurrentJukebox)
  const jukeSession = useSelector(selectCurrentJukeSession)
  const [liveProgress, setLiveProgress] = useState<number | null>(null)
  const [playerError, setPlayerError] = useState<string | null>(null)
  const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null)

  // ── SpotifyPlayerContext ──────────────────────────────────────────────────
  // MUST be destructured before hasAuxRef is created, so hasAux is defined
  // when the ref is initialized.
  const {
    play: auxPlay,
    pause: auxPause,
    setProgress: auxSetProgress,
    nextTrack: auxNextTrack,
    prevTrack: auxPrevTrack,
    like: auxLike,
    repeat: auxRepeat,
    togglePlay: auxTogglePlay,
    playerState: auxPlayerState,
    spotifyIsConnected,
    hasAux,
    deviceId,
    getCurrentPosition,
  } = useContext(SpotifyPlayerContext)

  // Keep a ref to hasAux so socket callbacks always read the latest value
  // without needing to re-register listeners.
  const hasAuxRef = useRef(hasAux)
  useEffect(() => {
    hasAuxRef.current = hasAux
  }, [hasAux])

  const { onEvent, emitMessage, socket } = useContext(SocketContext)

  // ===============================================================
  // Track State Sync
  // ===============================================================

  // Stable handler via ref — avoids re-registering listeners when hasAux changes
  const updateTrackStateFromSocket = useCallback((data: IPlayerState) => {
    //console.log('[PlayerContext] Received socket update:', {
    //  hasAux: hasAuxRef.current,
    //  data,
    //  willUpdate: !hasAuxRef.current
    //})
    
    if (hasAuxRef.current) {
      //console.log('[PlayerContext] Ignoring socket update - this device has aux')
      return
    }

    //console.log('[PlayerContext] Setting player state from socket:', data)
    setPlayerState(data)
  }, [])  

  useEffect(() => {
    onEvent<IPlayerState>('player-join-success', updateTrackStateFromSocket)
    onEvent<IPlayerState>('player-state-update', updateTrackStateFromSocket)

  }, [updateTrackStateFromSocket])

  // When player state changes, sync current track
  useEffect(() => {
    //console.log("Track")
    //console.log(currentTrack)
    setCurrentTrack(
      playerState?.spotify_track || playerState?.queued_track?.track || null,
    )
  }, [playerState])

  // Tick live progress forward every second while playing
useEffect(() => {
  if (!playerState?.progress) {
    setLiveProgress(0)
    return
  }

  if (!playerState.is_playing) {
    setLiveProgress(playerState.progress)
    return
  }

  if (hasAux) {
    // This device has aux — poll real Spotify position every 200ms
    const pollInterval = setInterval(async () => {
      const pos = await getCurrentPosition()
      if (pos !== null) setLiveProgress(pos)
    }, 1000)
    return () => clearInterval(pollInterval)
  } else {
    // Non-aux user — use timer-based estimation from socket updates
    setLiveProgress(playerState.progress)
    const timer = setInterval(() => {
      setLiveProgress((prev) => {
        if (prev == null) return playerState.progress
        return prev + 1000
      })
    }, 1000)
    return () => clearInterval(timer)
  }
}, [playerState?.is_playing, playerState?.progress, hasAux, getCurrentPosition])

  // When jukebox changes and user doesn't have aux, join for socket updates
  useEffect(() => {
    //console.log('[PlayerContext] Join check:', {
    //  jukeboxId: jukebox?.id,
    //  hasAux,
    //  socketConnected: socket?.current?.connected,
    //  socketId: socket?.current?.id,
    //  willJoin: !!(jukebox?.id && !hasAux)
    //})

    if (!jukebox?.id || hasAux || !socket?.current?.connected) {
      return
    }

    emitMessage<{ jukebox_id: number }>('player-join', {
      jukebox_id: jukebox.id,
    })
  }, [jukebox?.id, hasAux, socket, emitMessage])

  // ===============================================================
  // Player Aux Updates
  // ===============================================================

  // Sync aux player state into our playerState
  useEffect(() => {
    if (!auxPlayerState || !jukebox) return

    const track = auxPlayerState.current_track
      ? parseTrackObj(auxPlayerState.current_track)
      : undefined

    setPlayerState({
      ...auxPlayerState,
      jukebox_id: jukebox.id,
      spotify_track: track,
      last_progress_update: new Date().toISOString(),
    })
  }, [
    auxPlayerState?.current_track,
    auxPlayerState?.is_playing,
    auxPlayerState?.progress,
    jukebox,
  ])

  // Emit played/paused when is_playing changes
  useEffect(() => {
    if (!jukebox || !hasAux || !playerState) return

    //console.log('[PlayerContext] Emitting played/paused:', {
    //  action: playerState.is_playing ? 'played' : 'paused',
    //  spotify_track: playerState.spotify_track,
    //  auxPlayerState_current_track: auxPlayerState?.current_track,
    //  playerState_full: playerState
    //})

    emitMessage<IPlayerAuxUpdate>('player-aux-update', {
      jukebox_id: jukebox.id,
      action: playerState.is_playing ? 'played' : 'paused',
      spotify_track: playerState.spotify_track,
    })
  }, [hasAux, playerState?.is_playing])

  // Emit changed_tracks only when progress actually hits 0 (track flip)
  const progressIsZero = playerState?.progress === 0
  useEffect(() => {
    if (!jukebox || !hasAux || !playerState || !progressIsZero) return

    emitMessage<IPlayerAuxUpdate>('player-aux-update', {
      jukebox_id: jukebox.id,
      action: 'changed_tracks',
      spotify_track: playerState.spotify_track,
      progress: playerState.progress,
      timestamp: new Date(),
      duration_ms: playerState.spotify_track?.duration_ms,
    })
  }, [hasAux, progressIsZero])

  // Emit progress — but only on actual Spotify state updates, not the local
  // timer ticks. We use playerState.progress (set from auxPlayerState) not liveProgress.
  useEffect(() => {
    if (!jukebox || !hasAux || !playerState?.progress) return

    emitMessage<IPlayerAuxUpdate>('player-aux-update', {
      jukebox_id: jukebox.id,
      action: 'progress',
      progress: playerState.progress,
      spotify_track: playerState.spotify_track, //the slop maker failed me
    })
  }, [hasAux, playerState?.progress])

  // ===============================================================
  // Connect Device
  // ===============================================================

  const connectDevice = useCallback(async () => {
    if (jukebox && deviceId) {
      const res = await api.connectPlayerDevice(jukebox.id, deviceId)
      if (!res.success) {
        console.error(res.data)
        setPlayerError(res.data.message)
      } else {
        setPlayerState(res.data)
      }
    } else {
      setPlayerError('Must be connected to Spotify to connect device')
    }
  }, [jukebox, deviceId])

  // ===============================================================
  // Build Player — memoized so consumers only re-render when needed
  // ===============================================================

  const player = useMemo<Player>(() => {
    const base: Player = {
      hasAux,
      playerState,
      liveProgress,
      playerError,
      currentTrack,
      accountConnected: spotifyIsConnected,
      connectDevice,
      play: () => { throw new NotImplementedError() },
      pause: () => { throw new NotImplementedError() },
      setProgress: (_ms: number) => { throw new NotImplementedError() },
      nextTrack: () => { throw new NotImplementedError() },
      prevTrack: () => { throw new NotImplementedError() },
      like: () => { throw new NotImplementedError() },
      repeat: () => { throw new NotImplementedError() },
      togglePlay: () => { throw new NotImplementedError() },
    }

    if (!jukebox) return base

    if (hasAux) {
      // This device is the Spotify player — wire up aux controls directly
      return {
        ...base,
        play: auxPlay,
        pause: auxPause,
        setProgress: auxSetProgress,
        nextTrack: auxNextTrack,
        prevTrack: auxPrevTrack,
        like: auxLike,
        repeat: auxRepeat,
        togglePlay: auxTogglePlay,
      }
    }

    // Non-aux user — controls go through the API
    const executeAction = async (action: ActionType) => {
      await api.executePlayerAction(jukebox.id, { action_type: action })
    }

    return {
      ...base,
      play: () => executeAction(ActionType.PLAY),
      pause: () => executeAction(ActionType.PAUSE),
      nextTrack: () => executeAction(ActionType.NEXT),
      prevTrack: () => executeAction(ActionType.PREVIOUS),
      repeat: () => executeAction(ActionType.LOOP),
      togglePlay: () => {
        if (playerState?.is_playing) {
          executeAction(ActionType.PAUSE)
        } else {
          executeAction(ActionType.PLAY)
        }
      },
    }
  }, [
    hasAux,
    jukebox,
    playerState,
    liveProgress,
    playerError,
    currentTrack,
    spotifyIsConnected,
    connectDevice,
    auxPlay,
    auxPause,
    auxSetProgress,
    auxNextTrack,
    auxPrevTrack,
    auxLike,
    auxRepeat,
    auxTogglePlay,
  ])

  return (
    <PlayerContext.Provider value={player}>
      {props.children}
    </PlayerContext.Provider>
  )
}
