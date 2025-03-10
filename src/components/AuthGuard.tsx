import { useEffect, type ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  fetchAllClubs,
  fetchCurrentClubInfo,
  fetchJukeboxes,
  initializeUser,
  logoutUser,
  selectUserLoggedIn,
} from 'src/store'

export const AuthGuard = (props: { children?: ReactNode }) => {
  const userIsLoggedIn = useSelector(selectUserLoggedIn)

  const navigate = useNavigate()

  const initializeStores = async () => {
    await fetchAllClubs()
    await fetchCurrentClubInfo()
    await fetchJukeboxes()
  }

  useEffect(() => {
    initializeUser()
  }, [])

  // Triggers when login status changes
  useEffect(() => {
    if (userIsLoggedIn === false) {
      // User is explicitly logged out
      logoutUser()
      navigate('/auth/login')
    } else if (userIsLoggedIn === true) {
      // User is explicitly logged in
      initializeStores().then()
    } else {
      // Unknown, skip
    }
  }, [userIsLoggedIn])
  return <div>{props.children}</div>
}
