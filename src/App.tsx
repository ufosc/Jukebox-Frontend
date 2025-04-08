import { useCallback, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { SPOTIFY_AUTH_CHECK_MS } from './config'
import {
  KeyboardProvider,
  PlayerProvider,
  SocketContext,
  SpotifyProvider,
  Theme,
} from './context'
import {
  checkLinkAuth,
  selectCurrentJukebox,
  selectHasJukeboxAux,
  selectSpotifyAuth,
  selectUserLoggedIn,
  setInteraction,
  setNextTracks,
  setPlayerIsPlaying,
  setPlayerProgress,
  updatePlayerState,
} from './store'

export const App = () => {
  const spotifyAuth = useSelector(selectSpotifyAuth)
  const currentJukebox = useSelector(selectCurrentJukebox)
  const hasAux = useSelector(selectHasJukeboxAux)
  const isLoggedIn = useSelector(selectUserLoggedIn)

  const {
    emitMessage,
    onEvent,
    isConnected: socketIsConnected,
  } = useContext(SocketContext)

  // Triggers when receive spotify credentials from server
  useEffect(() => {
    if (!spotifyAuth || !isLoggedIn) return

    const timer = setInterval(async () => {
      await checkLinkAuth()
    }, SPOTIFY_AUTH_CHECK_MS)

    return () => clearInterval(timer)
  }, [spotifyAuth])

  // Receives track updates from server, updates store
  useEffect(() => {
    onEvent<IPlayerUpdate>('player-update', (data) => {
      if (hasAux) {
        // If spotify player is connected, only set certain state vars through player
        data.progress = undefined
        data.is_playing = undefined
      }

      updatePlayerState(data)
    })

    onEvent<IJukeboxInteraction>('player-interaction', (data) => {
      setInteraction(data)
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
      // Update player state with select settings
      setPlayerIsPlaying(state.is_playing)
      setPlayerProgress(state.progress)
      // Update server with new state
      emitMessage<IPlayerAuxUpdate>('player-aux-update', state)
    },
    [currentJukebox],
  )

  return (
    <Theme>
      <KeyboardProvider>
        <SpotifyProvider
          token={spotifyAuth?.access_token}
          jukebox={currentJukebox}
          onPlayerStateChange={handlePlayerTrackChange}
        >
          <PlayerProvider>
            <Outlet />
          </PlayerProvider>
        </SpotifyProvider>
      </KeyboardProvider>
    </Theme>
  )
}
