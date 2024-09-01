import { Outlet } from 'react-router'
import { Sidebar } from '../components'

import './Dashboard.scss'

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__sidebar">
        <Sidebar />
      </div>
      <div className="dashboard__main">
        <Outlet />
      </div>
    </div>
  )
}
