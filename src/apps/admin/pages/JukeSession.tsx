import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ApiClient } from 'src/api'
import { usePopover } from 'src/hooks'
import {
  selectCurrentJukebox,
  selectCurrentJukeSession,
  selectCurrentJukeSessionMembership,
  selectUser,
} from 'src/store'
import { AdminContext } from '../layout/Dashboard'
import './JukeSession.scss'

export const JukeSession = () => {
  const location = useLocation()
  const path = location.pathname

  const network = ApiClient.getInstance()

  const jukeSession = useSelector(selectCurrentJukeSession)
  const currentJbx = useSelector(selectCurrentJukebox)
  const currentJukeMember = useSelector(selectCurrentJukeSessionMembership)

  const adminStatus = useContext(AdminContext)

  const [jbxName, setJbxName] = useState('')
  const currentUser = useSelector(selectUser)
  const [isCreating, setIsCreating] = useState(false)

  //Member stuff
  const [enterCode, setEnterCode] = useState('')

  const navigate = useNavigate()

  const handleEnterCode = (e: ChangeEvent<HTMLInputElement>) => {
    const joinCode = e.target.value
    setEnterCode(joinCode)
  }

  const submitJoinCode = async (e: any) => {
    e.preventDefault()
    console.log(enterCode)
    if (currentJbx && jukeSession && currentUser) {
      const res = await network.joinJukeSessionWithCode(
        currentJbx.id,
        enterCode,
        currentUser.id,
      )
      setEnterCode('')
    } else {
      console.log('No jukebox active')
    }
  }

  useEffect(() => {
    if (jukeSession) {
      console.log('active session')
      navigate('/dashboard/jam-sessions/active')
    }
  }, [jukeSession])

  useEffect(() => {
    if (jukeSession) {
      console.log('active session')
      navigate('/dashboard/jam-sessions/active')
    }
  }, [])

  const {
    Popover: JukeSessionPopover,
    PopoverButton: JukeSessionPopoverButton,
  } = usePopover('juke-session-popover')

  const handleSubmit = async () => {
    const now = new Date()
    const endTime = new Date(now.getTime() + 2 * 60 * 60 * 1000)
    if (currentJbx) {
      const res = await network.jukeSessions.create(currentJbx?.id, {
        start_at: now.toString(),
        end_at: endTime.toString(),
      })
    }
  }

  useEffect(() => {
    console.log(currentJukeMember)
  }, [currentJukeMember])

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

      {adminStatus.role === 'member' && jukeSession && !currentJukeMember ? (
        <div>
          <input value={enterCode} onChange={handleEnterCode}></input>

          <button onClick={submitJoinCode}>Join Session</button>
        </div>
      ) : (
        <></>
      )}

      {adminStatus.role === 'admin' ? (
        jukeSession ? (
          <Outlet />
        ) : (
          <div className="juke-session__schedule-session">
            <div className="juke-session__schedule-session__title">
              Schedule Session
            </div>

            <input
              placeholder="Display Name"
              className="juke-session__schedule-session__selector"
            ></input>

            <button onClick={handleSubmit} className="button-fancy">
              Start Session
            </button>
          </div>
        )
      ) : (
        <></>
      )}
    </>
  )
}
