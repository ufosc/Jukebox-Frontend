import { useCallback, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { SPOTIFY_AUTH_CHECK_MS } from './config'
import {
  KeyboardProvider,
  SocketContext,
  SpotifyPlayerProvider,
  Theme,
} from './context'
import {
  checkSpotifyAuth,
  fetchCurrentClubInfo,
  fetchCurrentlyPlaying,
  fetchJukeboxes,
  fetchNextTracks,
  fetchUserInfo,
  initializeUser,
  logoutUser,
  selectUser,
  selectUserLoggedIn,
  setAllClubs,
  setCurrentClub,
  setPlayerState,
} from './store'
import {
  selectCurrentJukebox,
  selectHasJukeboxAux,
  selectSpotifyAuth,
} from './store/jukebox'

export const App = () => {
  const userIsLoggedIn = useSelector(selectUserLoggedIn)
  const userInfo = useSelector(selectUser)
  const spotifyAuth = useSelector(selectSpotifyAuth)
  const currentJukebox = useSelector(selectCurrentJukebox)
  const hasAux = useSelector(selectHasJukeboxAux)

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

  useEffect(() => {
    const timer = setInterval(() => {
      checkSpotifyAuth().then(() => {
        console.log('Refreshed spotify token')
      })
    }, SPOTIFY_AUTH_CHECK_MS)

    return () => clearInterval(timer)
  }, [spotifyAuth])

  /**
   * ======================== *
   * Spotify Track State Sync *
   * ======================== *
   */

  // On initialization, get currently playing and next tracks;
  // assume this user is not an admin, and does not have aux

  useEffect(() => {
    if (currentJukebox) {
      fetchCurrentlyPlaying().then((res) => {
        console.log('Currently playing:', res)
      })
      fetchNextTracks().then(() => {})
    }
  }, [currentJukebox])

  // On aux change, if has aux:
  //  1. init player
  //  2. authenticate with spotify
  useEffect(() => {
    // if (hasAux) {
    // }
  }, [hasAux])

  // Receives track updates from server, updates store
  useEffect(() => {
    onEvent<IPlayerUpdate>('track-state-update', (data) => {
      setPlayerState(data)

      if (data.next_tracks) {
        // setNextTracks(data.next_tracks)
      }
    })
  }, [currentJukebox, socketIsConnected])

  const handlePlayerTrackChange = useCallback(
    (state: {
      currentTrack: ITrack
      position: number
      isPlaying: boolean
      nextTracks: ITrack[]
    }) => {
      const { currentTrack, position, isPlaying, nextTracks } = state

      emitMessage<IPlayerAuxUpdate>('player-aux-update', {
        jukebox_id: currentJukebox!.id,
        current_track: currentTrack,
        position,
        is_playing: isPlaying,
        default_next_tracks: nextTracks,
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
          <Outlet />
        </SpotifyPlayerProvider>
      </KeyboardProvider>
    </Theme>
  )
}
