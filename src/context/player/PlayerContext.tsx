import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  fetchCurrentlyPlaying,
  selectCurrentJukebox,
  selectHasJukeboxAux,
  selectPlayerState,
  setInteraction,
  setNextTracks,
  updatePlayerState,
} from 'src/store'
import { uniqueId } from 'src/utils'
import { SocketContext } from '../SocketContext'
import { SpotifyContext } from './SpotifyContext'

interface Player {
  hasAux: boolean
  playerState: IPlayerState | null
  liveProgress: number | null
  play: () => void
  pause: () => void
  togglePlay: () => void
  setProgress: (progressMs: number) => void
  nextTrack: () => void
  prevTrack: () => void
  like: () => void
  repeat: () => void
}

export const PlayerContext = createContext({} as Player)

export const PlayerProvider = (props: { children: ReactNode }) => {
  const [playerState, setPlayerState] = useState<IPlayerState | null>(null)
  const jukebox = useSelector(selectCurrentJukebox)
  const progressTimerRef = useRef<number | undefined>()
  const [liveProgress, setLiveProgress] = useState<number | null>(null)

  /*== Get state from aux ==*/
  const hasAux = useSelector(selectHasJukeboxAux)
  const {
    play: auxPlay,
    pause: auxPause,
    togglePlay: auxTogglePlay,
    setProgress: auxSetProgress,
    nextTrack: auxNextTrack,
    prevTrack: auxPrevTrack,
    like: auxLike,
    repeat: auxRepeat,
    playerState: auxPlayerState,
  } = useContext(SpotifyContext)

  /*== Get state from API ==*/
  const storePlayerState = useSelector(selectPlayerState)

  /*== Determine which controls are given in interface ==*/
  const play = auxPlay
  const pause = auxPause
  const togglePlay = auxTogglePlay
  const setProgress = auxSetProgress
  const nextTrack = auxNextTrack
  const prevTrack = auxPrevTrack
  // let playerState: IPlayerState | null = null

  /**
   * ======================== *
   * API Track State Sync     *
   * ======================== *
   */
  const { onEvent, isConnected: socketIsConnected } = useContext(SocketContext)

  useEffect(() => {
    if (!hasAux) {
      fetchCurrentlyPlaying().then()
    }
  }, [jukebox])

  // Receives track updates from server, updates store
  useEffect(() => {
    onEvent<IPlayerUpdate>('player-update', (data) => {
      if (hasAux) {
        // If spotify player is connected, only set certain state vars through player
        data.progress = undefined
        data.is_playing = undefined
      }

      console.log('data:', data)

      updatePlayerState(data)
    })

    onEvent<IJukeboxInteraction>('player-interaction', (data) => {
      setInteraction(data)
    })

    onEvent<IQueuedTrack[]>('track-queue-update', (data) => {
      setNextTracks(data)
    })
  }, [jukebox, socketIsConnected])

  useEffect(() => {
    if (jukebox == null) {
      return
    }

    const stagedPlayerState: IPlayerState = {
      jukebox_id: 0,
      progress: 0,
      is_playing: false,
      current_track: {
        track: {
          artists: [],
          album: {
            id: '',
            album_type: 'album',
            artists: [],
            available_markets: [],
            href: '',
            release_date: '',
            release_date_precision: 'day',
            total_tracks: 0,
            uri: '',
            name: '',
            images: [],
          },
          disc_number: 0,
          explicit: false,
          popularity: 0,
          preview_url: null,
          track_number: 0,
          id: '',
          uri: '',
          name: '',
          type: 'track',
          duration_ms: 0,
        },
        queue_id: '',
        interactions: {
          likes: 0,
          dislikes: 0,
        },
      },
    }

    stagedPlayerState.jukebox_id = jukebox.id

    if (hasAux && auxPlayerState?.current_track) {
      stagedPlayerState.is_playing = auxPlayerState.is_playing
      stagedPlayerState.progress = auxPlayerState.progress
      stagedPlayerState.current_track = {
        interactions: storePlayerState?.current_track?.interactions ?? {
          dislikes: 0,
          likes: 0,
        },
        queue_id: storePlayerState?.current_track?.queue_id ?? '',
        track: {
          artists:
            storePlayerState?.current_track?.track.artists ??
            auxPlayerState.current_track.artists.map((artist) => ({
              href: artist.uri,
              id: uniqueId(),
              name: artist.name,
              type: 'artist',
              uri: artist.uri,
            })),
          album: {
            id: storePlayerState?.current_track?.track.album.id ?? '',
            album_type: 'album',
            artists: storePlayerState?.current_track?.track.album.artists ?? [],
            available_markets:
              storePlayerState?.current_track?.track.album.available_markets ??
              [],
            href: storePlayerState?.current_track?.track.album.href ?? '#',
            release_date:
              storePlayerState?.current_track?.track.album.release_date ?? '',
            release_date_precision:
              storePlayerState?.current_track?.track.album
                .release_date_precision ?? 'day',
            total_tracks:
              storePlayerState?.current_track?.track.album.total_tracks ?? 0,
            uri: auxPlayerState.current_track.album.uri,
            name: auxPlayerState.current_track.album.name,
            images: auxPlayerState.current_track.album.images,
          },
          disc_number: storePlayerState?.current_track?.track.disc_number ?? 0,
          explicit: storePlayerState?.current_track?.track.explicit ?? false,
          popularity: storePlayerState?.current_track?.track.popularity ?? 0,
          preview_url:
            storePlayerState?.current_track?.track.preview_url ??
            auxPlayerState.current_track.album.images[0]?.url,
          track_number:
            storePlayerState?.current_track?.track.track_number ?? 0,
          id: auxPlayerState.current_track.id,
          uri: auxPlayerState.current_track.uri,
          name: auxPlayerState.current_track.name,
          type: 'track',
          duration_ms: auxPlayerState.current_track.duration_ms,
        },
      }
    } else {
      stagedPlayerState.current_track = storePlayerState?.current_track
      stagedPlayerState.is_playing = storePlayerState?.is_playing ?? false
      stagedPlayerState.progress = storePlayerState?.progress ?? 0
    }

    setPlayerState(stagedPlayerState)
  }, [storePlayerState?.current_track, auxPlayerState?.current_track])

  /**
   * ======================== *
   * Spotify Track State Sync *
   * ======================== *
   */
  /*== Store Player Progress ==*/
  useEffect(() => {
    if (hasAux) return

    clearInterval(progressTimerRef.current)

    if (storePlayerState?.is_playing) {
      progressTimerRef.current = setInterval(() => {
        setLiveProgress((prev) => (prev ?? 0) + 1000)
      }, 1000)
    }

    return () => clearInterval(progressTimerRef.current)
  }, [
    storePlayerState?.current_track,
    storePlayerState?.is_playing,
    storePlayerState?.progress,
  ])

  /*== Aux Player Progress ==*/
  useEffect(() => {
    clearInterval(progressTimerRef.current)
    setLiveProgress(auxPlayerState?.progress ?? 0)

    if (auxPlayerState?.is_playing) {
      progressTimerRef.current = setInterval(() => {
        setLiveProgress((prev) => (prev ?? 0) + 1000)
      }, 1000)
    }

    return () => clearInterval(progressTimerRef.current)
  }, [
    auxPlayerState?.current_track,
    auxPlayerState?.is_playing,
    auxPlayerState?.progress,
  ])

  useEffect(() => {
    console.log('Player state in context:', playerState)
  }, [playerState])

  return (
    <PlayerContext.Provider
      value={{
        hasAux,
        playerState,
        liveProgress,
        play,
        pause,
        togglePlay,
        setProgress,
        nextTrack,
        prevTrack,
        like: () => {},
        repeat: () => {},
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  )
}
