import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
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

  // ===============================================================
  // Track State Sync
  // ===============================================================
  // When player state changes tracks, set current track so it's easier
  // for downstream services to reference
  useEffect(() => {
    setCurrentTrack(
      playerState?.spotify_track || playerState?.queued_track?.track || null,
    )
  }, [playerState])

  // When current track updates, set live progress counter
  useEffect(() => {
    if (!playerState?.progress) {
      setLiveProgress(0)
    } else if (playerState.is_playing) {
      // const passedMs =
      //   new Date().getTime() -
      //   new Date(playerState.last_progress_update).getTime()
      setLiveProgress(playerState.progress)
      const timer = setInterval(() => {
        setLiveProgress((prev) => {
          if (prev == null) {
            return playerState.progress
          } else {
            return prev + 1000
          }
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [playerState?.is_playing, playerState?.progress])

  // When aux state updates, set player state
  useEffect(() => {
    if (!auxPlayerState || !jukebox) return

    const track = auxPlayerState.current_track
      ? parseTrackObj(auxPlayerState.current_track)
      : undefined

    setPlayerState({
      ...auxPlayerState,
      jukebox_id: jukebox?.id,
      spotify_track: track,
      last_progress_update: new Date().toISOString(),
    })
  }, [
    auxPlayerState?.current_track,
    auxPlayerState?.is_playing,
    auxPlayerState?.progress,
  ])

  // ===============================================================
  // Set Controls and State
  // ===============================================================
  // Define default player controls, modify depending on whether user has aux or not
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
