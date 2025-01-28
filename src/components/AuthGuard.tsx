import { useEffect, type ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  fetchAllClubs,
  fetchCurrentClubInfo,
  fetchJukeboxes,
  fetchUserInfo,
  initializeUser,
  logoutUser,
  selectUser,
  selectUserLoggedIn,
  selectUserToken,
} from 'src/store'

export const AuthGuard = (props: { children?: ReactNode }) => {
  const userIsLoggedIn = useSelector(selectUserLoggedIn)
  const userInfo = useSelector(selectUser)
  const userToken = useSelector(selectUserToken)

  const navigate = useNavigate()

  useEffect(() => {
    initializeUser()
  }, [])

  // Triggers when login status changes
  useEffect(() => {
    if (userIsLoggedIn === false) {
      navigate('/auth/login')
    } else if (userIsLoggedIn) {
      // Store new user info
      fetchUserInfo().then(async (resUserInfo) => {
        if (!resUserInfo) return

        // setCurrentClub(resUserInfo.clubs[0].id)
        // setAllClubs(resUserInfo.clubs)
        await fetchAllClubs()
        await fetchCurrentClubInfo()
        await fetchJukeboxes()
      })
    } else if (userInfo || userIsLoggedIn === false) {
      logoutUser()
    }
  }, [userIsLoggedIn, userToken])
  return <div>{props.children}</div>
}
