import { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { SPOTIFY_AUTH_CHECK_MS } from './config'
import {
  KeyboardProvider,
  SocketContext,
  SpotifyPlayerProvider,
  Theme,
} from './context'
import {
  authenticateLink,
  checkLinkAuth,
  fetchCurrentlyPlaying,
  fetchNextTracks,
  incrementLiveProgress,
  selectCurrentJukebox,
  selectPlayerState,
  selectSpotifyAuth,
  setNextTracks,
  updatePlayerState,
} from './store'

export const App = () => {
  const spotifyAuth = useSelector(selectSpotifyAuth)
  const currentJukebox = useSelector(selectCurrentJukebox)
  const storePlayerState = useSelector(selectPlayerState)
  const [initialized, setInitialized] = useState(false)

  const [timer, setTimer] = useState<number | null>(null)

  const {
    emitMessage,
    onEvent,
    isConnected: socketIsConnected,
  } = useContext(SocketContext)

  useEffect(() => {
    setTimeout(() => {
      setInitialized(true)
    }, 60 * 1000)
  }, [])

  /**
   * ======================== *
   * Spotify Track State Sync *
   * ======================== *
   */
  useEffect(() => {
    if (timer) clearInterval(timer)
    if (storePlayerState?.is_playing) {
      const t = setInterval(() => {
        incrementLiveProgress()
      }, 1000)

      setTimer(t)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [
    storePlayerState?.current_track,
    storePlayerState?.is_playing,
    storePlayerState?.progress,
  ])

  // Triggers when receive spotify credentials from server
  useEffect(() => {
    if (!spotifyAuth || !initialized) return

    const timer = setInterval(async () => {
      await checkLinkAuth()
    }, SPOTIFY_AUTH_CHECK_MS)

    return () => clearInterval(timer)
  }, [spotifyAuth])

  // Triggers when the current jukebox changes
  useEffect(() => {
    if (currentJukebox) {
      fetchCurrentlyPlaying().then()
      fetchNextTracks().then()
    }
  }, [currentJukebox])

  // Receives track updates from server, updates store
  useEffect(() => {
    authenticateLink().then()
    onEvent<IPlayerUpdate>('player-update', (data) => {
      updatePlayerState(data)
    })

    onEvent<IPlayerUpdate>('player-action', (data) => {
      updatePlayerState(data)
    })

    onEvent<IQueuedTrack[]>('track-queue-update', (data) => {
      setNextTracks(data)
    })
  }, [currentJukebox, socketIsConnected])

  // Primary function that runs when Spotify Player changes
  const handlePlayerTrackChange = useCallback(
    (state?: IPlayerAuxUpdate) => {
      if (!state) {
        emitMessage('player-aux-update', {})
        return
      }

      emitMessage<IPlayerAuxUpdate>('player-aux-update', state)
    },
    [currentJukebox],
  )

  return (
    <Theme>
      <KeyboardProvider>
        <SpotifyPlayerProvider
          token={spotifyAuth?.access_token}
          jukebox={currentJukebox}
          onPlayerStateChange={handlePlayerTrackChange}
        >
          <Outlet />
        </SpotifyPlayerProvider>
      </KeyboardProvider>
    </Theme>
  )
}
