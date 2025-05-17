import { useCallback, useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  selectSpotifyAuth,
  selectUserLoggedIn,
  setPlayerIsPlaying,
  setPlayerProgress,
  updateLinks,
  updatePlayerState,
} from './store'

export const App = () => {
  const spotifyAuth = useSelector(selectSpotifyAuth)
  const currentJukebox = useSelector(selectCurrentJukebox)
  const isLoggedIn = useSelector(selectUserLoggedIn)

  const { emitMessage } = useContext(SocketContext)

  // Triggers when receive spotify credentials from server
  useEffect(() => {
    if (!spotifyAuth || !isLoggedIn) return

    const timer = setInterval(async () => {
      await checkLinkAuth()
    }, SPOTIFY_AUTH_CHECK_MS)

    return () => clearInterval(timer)
  }, [spotifyAuth])

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

  /**
     * Updates the links for usage
     * Figure out the placement later
     */
  useEffect(()=>{
    updateLinks()
  },[])

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
