import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { REACT_ENV } from './config'
import { SocketProvider, Theme } from './context'
import { SpotifyPlayerProvider } from './context/PlayerContext'
import {
  fetchUserInfo,
  initializeUser,
  logoutUser,
  selectUser,
  selectUserLoggedIn,
  selectUserSpotifyToken,
} from './store'

export const App = () => {
  const userIsLoggedIn = useSelector(selectUserLoggedIn)
  const userInfo = useSelector(selectUser)
  const token = useSelector(selectUserSpotifyToken)

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
      fetchUserInfo().then((resUserInfo) => {
        console.log('User info response:', resUserInfo)
      })
    } else if (userInfo || userIsLoggedIn === false) {
      logoutUser()
    }
  }, [userIsLoggedIn])

  return (
    <Theme>
      <SpotifyPlayerProvider token={token}>
        <SocketProvider />
        <Outlet />
      </SpotifyPlayerProvider>
    </Theme>
  )
}
