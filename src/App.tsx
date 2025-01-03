import { useCallback, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { SPOTIFY_AUTH_CHECK_MS } from './config'
import {
  KeyboardProvider,
  SocketContext,
  SpotifyPlayerProvider,
  Theme,
} from './context'
import { CurrentlyPlayingProvider } from './context/CurrentlyPlayingContext'
import {
  authenticateLink,
  checkLinkAuth,
  fetchCurrentlyPlaying,
  fetchNextTracks,
  selectCurrentJukebox,
  selectSpotifyAuth,
  setNextTracks,
  setPlayerState,
  updatePlayerState,
} from './store'

export const App = () => {
  const spotifyAuth = useSelector(selectSpotifyAuth)
  const currentJukebox = useSelector(selectCurrentJukebox)

  const {
    emitMessage,
    onEvent,
    isConnected: socketIsConnected,
  } = useContext(SocketContext)

  /**
   * ======================== *
   * Spotify Track State Sync *
   * ======================== *
   */

  // Triggers when receive spotify credentials from server
  useEffect(() => {
    if (!spotifyAuth) return

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
      setPlayerState(data)
    })

    onEvent<IPlayerAction>('player-action', (data) => {
      updatePlayerState(data)
    })

    onEvent<ITrackMeta[]>('track-queue-update', (data) => {
      setNextTracks(data)
    })
  }, [currentJukebox, socketIsConnected])

  // Primary function that runs when Spotify Player changes
  const handlePlayerTrackChange = useCallback(
    (state: {
      currentTrack: ITrack
      position: number
      isPlaying: boolean
      nextTracks: ITrack[]
      changedTracks: boolean
    }) => {
      const { currentTrack, position, isPlaying, nextTracks, changedTracks } =
        state

      emitMessage<IPlayerAuxUpdate>('player-aux-update', {
        jukebox_id: currentJukebox!.id,
        current_track: currentTrack,
        progress: position,
        is_playing: isPlaying,
        default_next_tracks: nextTracks,
        changed_tracks: changedTracks,
      })
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
          <CurrentlyPlayingProvider>
            <Outlet />
          </CurrentlyPlayingProvider>
        </SpotifyPlayerProvider>
      </KeyboardProvider>
    </Theme>
  )
}
