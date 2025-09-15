
import { Link, Outlet } from 'react-router-dom'
import './JukeSession.scss'
import { ActiveJukeSession } from './JukeSession/ActiveJukeSession'


export const JukeSession = () => {

  return(
    <>
    <div className='grid'>
      <div className='juke-session__title col-4'>
        Juke Session
      </div>

    </div>
    <div className='grid'>

      <span className='juke-session__page-switch col-2'>
        <Link className="juke-session__page-link" to="/dashboard/jam-sessions">
          Active
        </Link>
        <Link className="juke-session__page-link" to="/dashboard/jam-sessions/members">
          Members
        </Link>
        <Link className="juke-session__page-link" to="/dashboard/jam-sessions">
          History
        </Link>
      </span>
    </div>
    
    <Outlet />
    </>
  )
}