import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { KeyboardProvider, SocketProvider, Theme } from './context'
import { SpotifyPlayer } from './SpotifyPlayer'
import {
  fetchCurrentClubInfo,
  fetchJukeboxes,
  fetchUserInfo,
  initializeUser,
  logoutUser,
  selectUser,
  selectUserLoggedIn,
  setAllClubs,
  setCurrentClub,
} from './store'

export const App = () => {
  const userIsLoggedIn = useSelector(selectUserLoggedIn)
  const userInfo = useSelector(selectUser)

  const navigate = useNavigate()

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

  return (
    <Theme>
      <SocketProvider>
        <KeyboardProvider>
          <SpotifyPlayer>
            <Outlet />
          </SpotifyPlayer>
        </KeyboardProvider>
      </SocketProvider>
    </Theme>
  )
}
