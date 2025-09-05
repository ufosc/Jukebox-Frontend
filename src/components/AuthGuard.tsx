import { useEffect, type ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ApiClient } from 'src/api'
import {
  fetchAllClubs,
  fetchCurrentClubInfo,
  fetchJukeboxes,
  fetchMemberships,
  initializeUser,
  logoutUser,
  selectCurrentClub,
  selectUser,
  selectUserLoggedIn,
  store,
} from 'src/store'

export const AuthGuard = (props: { children?: ReactNode }) => {
  const userIsLoggedIn = useSelector(selectUserLoggedIn)

  const api = ApiClient.getInstance()

  useEffect(() => {
    if (api.isAuthenticated) {
      initializeUser()
    } else {
      logoutUser()
    }
  }, [])

  /**
   * Slices for getting current club membership
   */
  const user = useSelector(selectUser)
  const currentClub = useSelector(selectCurrentClub)

  const navigate = useNavigate()

  /**
   * Called when user is logged in,
   * this is the initialization point for
   * all of the redux stores - except the
   * user store.
   */
  const initializeStores = async () => {
    await fetchAllClubs()
    await fetchCurrentClubInfo()

    const initialClub = selectCurrentClub(store.getState())

    if (initialClub !== null && user !== null) {
      fetchMemberships()
      await fetchJukeboxes(initialClub.id)
    }
  }

  // useEffect(() => {
  //   initializeUser()
  // }, [])

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
