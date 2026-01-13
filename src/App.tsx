import { useCallback, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { NoticesProvider } from './components/notices/NoticesContext'
import { SPOTIFY_AUTH_CHECK_MS } from './config'
import {
  KeyboardProvider,
  PlayerProvider,
  SocketContext,
  SocketProvider,
  SpotifyPlayerProvider,
  Theme,
} from './context'
import {
  checkLinkAuth,
  fetchCurrentClubInfo,
  fetchCurrentJukeboxInfo,
  fetchCurrentJukeSessionInfo,
  fetchJukeboxes,
  selectCurrentClub,
  selectCurrentJukebox,
  selectCurrentJukeSession,
  selectSpotifyAuth,
  selectUserLoggedIn,
} from './store'

export const App = () => {
  const spotifyAuth = useSelector(selectSpotifyAuth)
  const currentJukebox = useSelector(selectCurrentJukebox)
  const currentSession = useSelector(selectCurrentJukeSession)
  const isLoggedIn = useSelector(selectUserLoggedIn)
  const currentClub = useSelector(selectCurrentClub)

  const { emitMessage } = useContext(SocketContext)

  // Triggers when receive spotify credentials from server
  useEffect(() => {
    console.log('spotify auth changed')
    if (!spotifyAuth || !isLoggedIn) return

    const timer = setInterval(async () => {
      await checkLinkAuth()
    }, SPOTIFY_AUTH_CHECK_MS)

    return () => clearInterval(timer)
  }, [spotifyAuth])

  // Primary function that runs when Spotify Player changes
  const handlePlayerTrackChange = useCallback(
    (state?: IPlayerAuxUpdate) => {
      console.log('handlePlayerTrackChange')
      if (!state) {
        emitMessage('player-aux-update', {})
        return
      }
      console.log('player aux state updated')
      console.log(state)
      // Update player state with select settings
      // setPlayerIsPlaying(state.is_playing)
      // setPlayerProgress(state.progress)
      // Update server with new state
      emitMessage<IPlayerAuxUpdate>('player-aux-update', state)
    },
    [currentJukebox],
  )

  useEffect(() => {
    console.log('current club:', currentClub)
    if (!currentClub) return
    fetchCurrentClubInfo().then()
    fetchJukeboxes(currentClub.id).then()
  }, [currentClub])

  // Initialize Jukebox
  useEffect(() => {
    console.log('fetching session queue')

    fetchCurrentJukeboxInfo().then(() => {
      fetchCurrentJukeSessionInfo()
    })
  }, [currentJukebox])

  // Initialize JukeSession
  // useEffect(() => {
  //   // ...
  // }, [currentSession])

  return (
    <Theme>
      <KeyboardProvider>
        <NoticesProvider>
          <SpotifyPlayerProvider
            token={spotifyAuth?.access_token}
            jukebox={currentJukebox}
            onPlayerStateChange={handlePlayerTrackChange}
          >
            <SocketProvider>
              <PlayerProvider>
                <Outlet />
              </PlayerProvider>
            </SocketProvider>
          </SpotifyPlayerProvider>
        </NoticesProvider>
      </KeyboardProvider>
    </Theme>
  )
}
