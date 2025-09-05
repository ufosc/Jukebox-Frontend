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
import { SpotifyPlayerContext } from './SpotifyPlayerContext'
import { PlayerControls } from './types'

interface Player extends PlayerControls {
  hasAux: boolean
  playerState: IPlayerState | null
  // currentTrack?: ITrack
  liveProgress: number | null
  playerError: string | null
  currentTrack: ITrack | null
  connectDevice: () => Promise<void>
}

export const PlayerContext = createContext({} as Player)

export const PlayerProvider = (props: { children: ReactNode }) => {
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
    deviceId,
  } = useContext(SpotifyPlayerContext)

  useEffect(() => {
    setCurrentTrack(
      playerState?.spotify_track || playerState?.queued_track?.track || null,
    )
  }, [playerState])

  const api = ApiClient.getInstance()

  let player: Player = {
    hasAux,
    playerState,
    liveProgress,
    playerError,
    currentTrack,
    connectDevice: async () => {
      if (jukebox && deviceId) {
        const res = await api.connectPlayerDevice(jukebox.id, deviceId)
        if (!res.success) {
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
    if (!hasAux && jukebox && jukeSession) {
      api.getCurrentlyPlaying(jukebox.id).then((res) => {
        if (!res.success) {
          setPlayerError(res.data.message)
        } else {
          setPlayerState(res.data)
        }
      })
    }
  }, [jukebox, jukeSession])

  // ===============================================================
  // Set Controls and State
  // ===============================================================
  if (hasAux) {
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

      if (!playerRes.success) {
        setPlayerError(playerRes.data.message)
      } else {
        setPlayerError(null)
        setPlayerState(playerRes.data)
      }
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
