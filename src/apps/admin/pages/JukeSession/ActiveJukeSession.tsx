import { useSelector } from 'react-redux'
import { TrackList } from 'src/components'
import { selectCurrentJukebox, selectCurrentJukeSession, selectNextTracks } from 'src/store'
import './ActiveJukeSession.scss'
import { useEffect, useState } from 'react'
import { ApiClient } from 'src/api'

export const ActiveJukeSession = () => {
  const nextTracks = useSelector(selectNextTracks)
  const currentJbx = useSelector(selectCurrentJukebox)
  const currentJbxSession = useSelector(selectCurrentJukeSession)

  const [sessionMembers, setSessionMembers] = useState([])
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

  useEffect(()=>{
    if(currentJbxSession && currentJbx){
      const res = network.getQueuedTracks(currentJbx?.id, currentJbxSession.id)
      console.log(res)
    }
  },[currentJbxSession])

  return (
    <>
      <div className="grid">
        <div className="col-5 active-juke-session__time active-juke-session__border">
          <div className="active-juke-session__time__text-info">
            <div className="active-juke-session__subtext">Started</div>
            <div className="active-juke-session__main-text">{currentJbxSession?.start_at}</div>
          </div>
          <div className="active-juke-session__time__text-info">
            <div className="active-juke-session__subtext">Ended</div>
            <div className="active-juke-session__main-text">{currentJbxSession?.end_at}</div>
          </div>
          <div className="active-juke-session__time__text-info">
            <div className="active-juke-session__subtext">Remaining</div>
            <div className="active-juke-session__main-text">1h 25m</div>
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
          <div className="active-juke-session__numbers">{nextTracks.length}</div>
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
            <button className="button-outlined">View All</button>
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
            <button className="button-outlined">View All</button>
          </div>
        </div>
      </div>
    </>
  )
}
