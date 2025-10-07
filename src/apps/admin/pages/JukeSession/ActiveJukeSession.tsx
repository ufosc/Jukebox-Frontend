import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ApiClient } from 'src/api'
import { TrackList } from 'src/components'
import {
  selectCurrentJukebox,
  selectCurrentJukeSession,
  selectNextTracks,
} from 'src/store'
import './ActiveJukeSession.scss'

export const ActiveJukeSession = () => {
  const nextTracks = useSelector(selectNextTracks)
  const currentJbx = useSelector(selectCurrentJukebox)
  const currentJbxSession = useSelector(selectCurrentJukeSession)

  const [sessionMembers, setSessionMembers] = useState([])
  const [sessionStart, setSessionStart] = useState('')
  const [sessionEnd, setSessionEnd] = useState('')
  const [timeLeft, setTimeLeft] = useState('')
  //const [sessionQueue, setSessionQueue] = useState<IQueue[]>([])

  const network = ApiClient.getInstance()

  const members = [
    {
      name: 'Jim',
      joined: '5m ago',
      queued: '5 tracks',
      likes: '85%',
    },
    {
      name: 'Jim',
      joined: '5m ago',
      queued: '5 tracks',
      likes: '85%',
    },
    {
      name: 'Jim',
      joined: '5m ago',
      queued: '5 tracks',
      likes: '85%',
    },
    {
      name: 'Jim',
      joined: '5m ago',
      queued: '5 tracks',
      likes: '85%',
    },
    {
      name: 'Jim',
      joined: '5m ago',
      queued: '5 tracks',
      likes: '85%',
    },
    {
      name: 'Jim',
      joined: '5m ago',
      queued: '5 tracks',
      likes: '85%',
    },
    {
      name: 'Jim',
      joined: '5m ago',
      queued: '5 tracks',
      likes: '85%',
    },
    {
      name: 'Jim',
      joined: '5m ago',
      queued: '5 tracks',
      likes: '85%',
    },
    {
      name: 'Jim',
      joined: '5m ago',
      queued: '5 tracks',
      likes: '85%',
    },
    {
      name: 'Jim',
      joined: '5m ago',
      queued: '5 tracks',
      likes: '85%',
    },
    {
      name: 'Jim',
      joined: '5m ago',
      queued: '5 tracks',
      likes: '85%',
    },
    {
      name: 'Jim',
      joined: '5m ago',
      queued: '5 tracks',
      likes: '85%',
    },
  ]
  const joinCode = currentJbxSession?.join_code

  useEffect(() => {
    if (currentJbxSession && currentJbx) {
      const res = network.getQueuedTracks(currentJbx?.id, currentJbxSession.id)
      console.log(res)
    }
  }, [currentJbxSession])

  function formatTime(isoString: string): string {
    const date = new Date(isoString)

    let hours = date.getHours()
    const minutes = date.getMinutes()
    const isPM = hours >= 12

    hours = hours % 12 || 12 // convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, '0')

    const period = isPM ? 'p' : 'a'

    return `${hours}:${formattedMinutes} ${period}`
  }

  //Redo later to get remaining time
  function getTimeRemaining(start: string, end: string) {
    const startDate = new Date(start)
    const endDate = new Date(end)

    // Difference in milliseconds
    const diffMs = endDate.getTime() - startDate.getTime()
    if (diffMs <= 0) {
      return '0m'
    }

    const diffSec = Math.floor(diffMs / 1000)
    const hours = Math.floor(diffSec / 3600)
    const minutes = Math.floor((diffSec % 3600) / 60)
    const seconds = diffSec % 60

    // Compact readable format
    let formatted = ''
    if (hours > 0) formatted += `${hours}h `
    if (minutes > 0) formatted += `${minutes}m `
    if (hours === 0 && minutes === 0) formatted += `${seconds}s`

    formatted = formatted.trim()

    return formatted
  }

  useEffect(() => {
    if (currentJbxSession) {
      setSessionStart(formatTime(currentJbxSession.start_at))
      setSessionEnd(formatTime(currentJbxSession.end_at))
      setTimeLeft(
        getTimeRemaining(currentJbxSession.start_at, currentJbxSession.end_at),
      )
    }
  }, [currentJbxSession])

  return (
    <>
      <div className="grid">
        <div className="col-5 active-juke-session__time active-juke-session__border">
          <div className="active-juke-session__time__text-info">
            <div className="active-juke-session__subtext">Started</div>
            <div className="active-juke-session__main-text">{sessionStart}</div>
          </div>
          <div className="active-juke-session__time__text-info">
            <div className="active-juke-session__subtext">Ended</div>
            <div className="active-juke-session__main-text">{sessionEnd}</div>
          </div>
          <div className="active-juke-session__time__text-info">
            <div className="active-juke-session__subtext">Remaining</div>
            <div className="active-juke-session__main-text">{timeLeft}</div>
          </div>
        </div>
        <div className="col-5"></div>
        <div className="col-2">
          <button className="button-fancy-rounded">End Now</button>
        </div>
      </div>
      <div className="grid">
        <div className="col-4 active-juke-session__main-info active-juke-session__border">
          <div className="active-juke-session__numbers">{members.length}</div>
          <div className="active-juke-session__numbers-subtext">Joined</div>
        </div>

        <div className="col-4 active-juke-session__main-info active-juke-session__border">
          <div className="active-juke-session__numbers">
            {nextTracks.length}
          </div>
          <div className="active-juke-session__numbers-subtext">
            Tracks Queued
          </div>
        </div>

        <div className="col-4 active-juke-session__main-info active-juke-session__border">
          <div className="active-juke-session__numbers">{joinCode}</div>
          <div className="active-juke-session__numbers-subtext">Join Code</div>
        </div>
      </div>

      <div className="grid">
        <div className="col-6 active-juke-session__border active-juke-session__main-container">
          <div className="active-juke-session__main-container__header">
            Members Joined
          </div>

          <div className="active-juke-session__main-list-header">
            <div className="active-juke-session__member__name"></div>
            <div className="active-juke-session__member__joined">Joined</div>
            <div className="active-juke-session__member__queued">Queued</div>
            <div className="active-juke-session__member__likes">Like Ratio</div>
          </div>

          <ul className="active-juke-session__member-list">
            {members.slice(0, 6).map((member, idx) => (
              <li className="active-juke-session__member">
                <div className="active-juke-session__member__name">
                  {member.name}
                </div>
                <div className="active-juke-session__member__joined">
                  {member.joined}
                </div>
                <div className="active-juke-session__member__queued">
                  {member.queued}
                </div>
                <div className="active-juke-session__member__likes">
                  {member.likes}
                </div>
              </li>
            ))}
          </ul>

          <div className="active-juke-session__button-container">
            <NavLink to={"/dashboard/jam-sessions/members"}>
              <button className="button-outlined">View All</button>
            </NavLink>
          </div>
        </div>

        <div className="col-6 active-juke-session__border active-juke-session__main-container">
          <div className="active-juke-session__main-container__header">
            Tracks Queued
          </div>

          <div className="active-juke-session__main-list-header">
            <div className="active-juke-session__main-list-header__name"></div>
            <div className="active-juke-session__main-list-header__recommend">
              Recommended By
            </div>
            <div className="active-juke-session__main-list-header__interactions">
              Interactions
            </div>
          </div>

          <ul className="active-juke-session__track-list-container">
            <TrackList
              tracks={nextTracks}
              maxCount={4}
              showIcon={false}
              showLength={false}
            />
          </ul>
          <div className="active-juke-session__button-container">
            <NavLink to={"/dashboard/music/queue"}>
              <button className="button-outlined">View All</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}
