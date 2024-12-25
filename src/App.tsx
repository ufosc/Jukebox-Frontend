import { useCallback, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import {
  KeyboardProvider,
  SocketContext,
  SpotifyPlayerProvider,
  Theme,
} from './context'
import {
  fetchCurrentClubInfo,
  fetchJukeboxes,
  fetchUserInfo,
  initializeUser,
  logoutUser,
  selectClubSpotifyAuth,
  selectUser,
  selectUserLoggedIn,
  setAllClubs,
  setCurrentClub,
  setCurrentTrack,
  setNextTracks,
} from './store'
import { selectCurrentJukebox } from './store/jukebox'

export const App = () => {
  const userIsLoggedIn = useSelector(selectUserLoggedIn)
  const userInfo = useSelector(selectUser)
  const spotifyAuth = useSelector(selectClubSpotifyAuth)
  const currentJukebox = useSelector(selectCurrentJukebox)
  const {
    emitMessage,
    onEvent,
    isConnected: socketIsConnected,
  } = useContext(SocketContext)

  const navigate = useNavigate()

  /**
   * =================== *
   * User Authentication *
   * =================== *
   */

  useEffect(() => {
    if (userIsLoggedIn === false) {
      navigate('/auth/admin/login')
    }
  }, [userIsLoggedIn])

  useEffect(() => {
    initializeUser()
  }, [])

  useEffect(() => {
    if (userIsLoggedIn) {
      // Store new user info
      fetchUserInfo().then(async (resUserInfo) => {
        if (!resUserInfo) return

        setCurrentClub(resUserInfo.clubs[0])
        setAllClubs(resUserInfo.clubs)
        await fetchCurrentClubInfo()
        await fetchJukeboxes()
      })
    } else if (userInfo || userIsLoggedIn === false) {
      logoutUser()
    }
  }, [userIsLoggedIn])

  /**
   * ======================== *
   * Spotify Track State Sync *
   * ======================== *
   */

  // Receives track updates from server, updates store
  useEffect(() => {
    onEvent<ITrackStateUpdate>('track-state-update', (data) => {
      if (data.current_track) {
        setCurrentTrack(data.current_track)
      }
      if (data.next_tracks) {
        setNextTracks(data.next_tracks)
      }
    })
  }, [currentJukebox, socketIsConnected])

  const handlePlayerTrackChange = useCallback(
    (newTrack: ITrack, prevTrack?: ITrack) => {
      emitMessage<IPlayerUpdate>('player-update', {
        current_track: newTrack,
        jukebox_id: currentJukebox!.id,
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
          onTrackChange={handlePlayerTrackChange}
        >
          <Outlet />
        </SpotifyPlayerProvider>
      </KeyboardProvider>
    </Theme>
  )
}
