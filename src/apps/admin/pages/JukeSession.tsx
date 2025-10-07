import { Link, Outlet, useLocation } from 'react-router-dom'
import './JukeSession.scss'
import { useSelector } from 'react-redux'
import { selectCurrentJukebox, selectCurrentJukeSession } from 'src/store'
import { usePopover } from 'src/hooks'
import { useState } from 'react'
import { ApiClient } from 'src/api'

export const JukeSession = () => {
  const location = useLocation()
  const path = location.pathname

  const network = ApiClient.getInstance()

  const jukeSession = useSelector(selectCurrentJukeSession)
  const currentJbx = useSelector(selectCurrentJukebox)

  const [jbxName, setJbxName] = useState('')


  const [isCreating, setIsCreating] = useState(false);

  const { Popover: JukeSessionPopover, PopoverButton: JukeSessionPopoverButton } =
      usePopover('juke-session-popover')


  const handleSubmit = async () => {
    const now = new Date;
    const endTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    if(currentJbx){
      const res = await network.jukeSessions.create(currentJbx?.id, {
          start_at: now.toString(),
          end_at: endTime.toString()
      });

      console.log(res)
    }
  }

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


      {jukeSession ? (<Outlet />) : 
    <div>
      <input
        placeholder='Display Name'
        
        className=''
      >
      </input>
      <button onClick={handleSubmit}>
        Start Session
      </button>
      {


      }
      
      </div>}

    </>
  )
}
