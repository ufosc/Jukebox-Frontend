import { useEffect, type ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  fetchAllClubs,
  fetchCurrentClubInfo,
  fetchJukeboxes,
  initializeUser,
  logoutUser,
  selectCurrentClub,
  selectUser,
  selectUserLoggedIn,
  store,
  updateMembership,
} from 'src/store'

export const AuthGuard = (props: { children?: ReactNode }) => {
  const userIsLoggedIn = useSelector(selectUserLoggedIn)

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
    await fetchJukeboxes()

    const initialClub = selectCurrentClub(store.getState())

    if (initialClub !== null && user !== null) {
      updateMembership(initialClub.id, user.id)
    }
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
