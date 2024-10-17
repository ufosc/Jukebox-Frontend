import { Link, Outlet } from 'react-router-dom'
import './Music.scss'

export const Music = () => {
  return (
    <div className="container">
      <div className="musicTitle">Music</div>
      <span className="music-page-switch">
        <Link className="music-page-link" to="/admin/music/queue">
          Track Queue
        </Link>{' '}
        |{' '}
        <Link className="music-page-link" to="/admin/music/search">
          Search Tracks
        </Link>
      </span>
      <div>
        <Outlet />
      </div>
    </div>
  )
}