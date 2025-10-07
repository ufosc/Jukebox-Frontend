import { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { selectCurrentJukebox, selectCurrentMembership } from 'src/store'
import { Sidebar, Topbar } from '../components'
import './Dashboard.scss'

export interface AdminContextType {
  role: string
  jukebox: IJukebox | null
}

export const AdminContext = createContext<AdminContextType>({
  role: 'admin',
  jukebox: null,
})

export const Dashboard = () => {
  const currentJukebox = useSelector(selectCurrentJukebox)
  const currentMembership = useSelector(selectCurrentMembership)

  const [currentContext, setCurrentContext] = useState({
    role: 'admin',
    jukebox: currentJukebox,
  })

  //Re-enable later
  useEffect(() => {
    console.log(currentMembership)
    if (currentMembership && currentMembership.is_admin) {
      setCurrentContext((prev) => ({
        ...prev,
        role: 'admin',
      }))
    } else {
      setCurrentContext((prev) => ({
        ...prev,
        role: 'member',
      }))
    }
  }, [currentMembership])

  return (
    <AdminContext.Provider value={currentContext}>
      <div className="dashboard">
        <div className="dashboard__sidebar">
          <Sidebar />
        </div>
        <div className="dashboard__main">
          <Topbar />
          <div className="dashboard__main__outlet">
            <Outlet />
          </div>
        </div>
      </div>
    </AdminContext.Provider>
  )
}
