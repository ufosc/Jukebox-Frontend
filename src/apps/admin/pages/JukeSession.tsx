import { Link, Outlet, useLocation } from 'react-router-dom'
import './JukeSession.scss'

export const JukeSession = () => {
  const location = useLocation()
  const path = location.pathname

  return (
    <>
      <div className="grid">
        <div className="juke-session__title col-4">Juke Session</div>
      </div>
      <div className="grid">
        <span className="juke-session__page-switch">
          <Link
            className={`juke-session__page-link${path.includes('active') ? '__focused' : ''}`}
            to="/dashboard/jam-sessions/active"
          >
            Active
          </Link>
          <Link
            className={`juke-session__page-link${path.includes('members') ? '__focused' : ''}`}
            to="/dashboard/jam-sessions/members"
          >
            Members
          </Link>
          <Link
            className={`juke-session__page-link${path.includes('history') ? '__focused' : ''}`}
            to="/dashboard/jam-sessions/history"
          >
            History
          </Link>
        </span>
      </div>

      <Outlet />
    </>
  )
}
