import { Outlet } from 'react-router-dom'
import { Sidebar, Topbar } from '../components'

import './Dashboard.scss'

export const Dashboard = () => {
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
