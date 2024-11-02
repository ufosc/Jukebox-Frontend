import { Outlet } from 'react-router-dom'
import { Sidebar, Topbar } from '../components'

import { useContext, useEffect } from 'react'
import { SpotifyPlayerContext } from 'src/context'
import { setCurrentTrack, setNextTracks } from 'src/store'
import './Dashboard.scss'

export const Dashboard = () => {
  const { currentTrack, nextTracks } = useContext(SpotifyPlayerContext)

  useEffect(() => {
    setCurrentTrack(currentTrack)
    setNextTracks(nextTracks)
  }, [currentTrack])

  return (
    <div className="dashboard">
      <div className="dashboard__sidebar">
        <Sidebar />
      </div>
      <div className="dashboard__main">
        <Topbar />
        <Outlet />
      </div>
    </div>
  )
}
