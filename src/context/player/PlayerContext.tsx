import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ApiClient } from 'src/api'
import {
  selectCurrentJukebox,
  selectCurrentJukeSession,
  selectHasJukeboxAux,
} from 'src/store'
import { ActionType } from 'src/types/jukebox-enums'
import { NotImplementedError } from 'src/utils'
import { SocketContext } from '../SocketContext'
import { SpotifyPlayerContext } from './SpotifyPlayerContext'
import { PlayerControls } from './types'

interface Player extends PlayerControls {
  hasAux: boolean
  accountConnected: boolean
  playerState: IPlayerState | null
  // currentTrack?: ITrack
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
  const progressTimerRef = useRef<number | undefined>()

  const [liveProgress, setLiveProgress] = useState<number | null>(null)
  const hasAux = useSelector(selectHasJukeboxAux)
  const [playerError, setPlayerError] = useState<string | null>(null)
  const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null)
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
    deviceId,
  } = useContext(SpotifyPlayerContext)

  const { onEvent, emitMessage } = useContext(SocketContext)

  useEffect(() => {
    console.log('player track changed')
    console.log(playerState)
    setCurrentTrack(
      playerState?.spotify_track || playerState?.queued_track?.track || null,
    )
  }, [playerState])

  useEffect(() => {
    if (currentTrack && playerState) {
      const timer = setInterval(() => {
        if (playerState.is_playing) {
          // setLiveProgress((prev) => (prev ?? 0) + 1000)
          const passedMs = playerState.last_progress_update
            ? new Date().getTime() -
              new Date(playerState.last_progress_update).getTime()
            : 1000
          setLiveProgress(playerState.progress + passedMs)
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [currentTrack, playerState])

  let player: Player = {
    hasAux,
    playerState,
    liveProgress,
    playerError,
    currentTrack,
    accountConnected: spotifyIsConnected,
    connectDevice: async () => {
      if (jukebox && deviceId) {
        const res = await api.connectPlayerDevice(jukebox.id, deviceId)
        if (!res.success) {
          console.error(res.data)
          setPlayerError(res.data.message)
        } else {
          setPlayerState(res.data)
        }
      } else {
        setPlayerError('Must be connected to spotify to connect device')
      }
    },
    play: () => {
      throw new NotImplementedError()
    },
    pause: () => {
      throw new NotImplementedError()
    },
    setProgress: (ms: number) => {
      throw new NotImplementedError()
    },
    nextTrack: () => {
      throw new NotImplementedError()
    },
    prevTrack: () => {
      throw new NotImplementedError()
    },
    like: () => {
      throw new NotImplementedError()
    },
    repeat: () => {
      throw new NotImplementedError()
    },
    togglePlay: () => {
      throw new NotImplementedError()
    },
  }

  // ===============================================================
  // API Track State Sync
  // ===============================================================
  useEffect(() => {
    console.log(
      'jukebox and session changed, has aux: ',
      hasAux,
      jukebox,
      jukeSession,
      playerState,
    )
    if (!hasAux && jukebox && jukeSession && !playerState) {
      console.log('Attemping Player Join')
      emitMessage<{ jukebox_id: number }>('player-join', {
        jukebox_id: jukebox.id,
      })
      onEvent<IPlayerState>('player-join-success', (data) => {
        if (!playerState) {
          setPlayerState(data)
        }
      })
      onEvent<IPlayerState>('player-state-update', (data) => {
        setPlayerState(data)
        console.log('aux player client updated')
        console.log(data)
      })
    } else if (jukebox && jukeSession && playerState) {
      console.log('Updating Player Aux Broadcast')
      emitMessage('player-ping', {})
      emitMessage<IPlayerAuxClientUpdate>('player-aux-update', {
        jukebox_id: jukebox.id,
        action: 'changed_tracks',
        spotify_track: playerState.spotify_track,
        progress: playerState.progress,
        timestamp: new Date(),
        duration_ms: auxPlayerState?.current_track?.duration_ms,
      })
      emitMessage<IPlayerAuxClientUpdate>('player-aux-update', {
        jukebox_id: jukebox.id,
        action: playerState.is_playing ? 'played' : 'paused',
      })
    }
  }, [jukebox, jukeSession, auxPlayerState])

  useEffect(() => {
    if (auxPlayerState && jukebox) {
      console.log('aux player state:', auxPlayerState)
      const auxTrack = auxPlayerState.current_track
      setPlayerState({
        jukebox_id: jukebox.id,
        last_progress_update: new Date().toISOString(),
        is_playing: auxPlayerState.is_playing,
        progress: auxPlayerState.progress,
        spotify_track: auxTrack
          ? {
              name: auxTrack.name,
              album: auxTrack.album.name,
              release_year: 0, // TODO: Get from api
              artists: auxTrack.artists.map((artist) => artist.name),
              spotify_id: auxTrack.id!,
              spotify_uri: auxTrack.uri,
              duration_ms: auxTrack.duration_ms,
              is_explicit: false, // TODO: Get from API
              preview_url: null,
              id: 0, // TODO: Get from API
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }
          : undefined,
      })
    }
  }, [hasAux, auxPlayerState])

  // ===============================================================
  // Set Controls and State
  // ===============================================================
  // FIXME: This is reevaluated every time any state variable changes
  if (jukebox && hasAux) {
    // User is connected to Spotify's player directly
    player = {
      ...player,
      play: auxPlay,
      pause: auxPause,
      setProgress: auxSetProgress,
      nextTrack: auxNextTrack,
      prevTrack: auxPrevTrack,
      like: auxLike,
      repeat: auxRepeat,
      togglePlay: auxTogglePlay,
    }
  } else if (jukebox) {
    // User get's player state from api
    const executeAction = async (action: ActionType) => {
      const playerRes = await api.executePlayerAction(jukebox.id, {
        action_type: action,
      })
    }

    const togglePlay = () => {
      if (playerState?.is_playing) {
        executeAction(ActionType.PAUSE)
      } else {
        executeAction(ActionType.PLAY)
      }
    }

    player = {
      ...player,
      play: () => executeAction(ActionType.PLAY),
      pause: () => executeAction(ActionType.PAUSE),
      nextTrack: () => executeAction(ActionType.NEXT),
      prevTrack: () => executeAction(ActionType.PREVIOUS),
      repeat: () => executeAction(ActionType.LOOP),
      togglePlay,
    }
  }

  return (
    <PlayerContext.Provider value={player}>
      {props.children}
    </PlayerContext.Provider>
  )
}
