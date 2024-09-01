import { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { socket } from 'src/lib'
import {
  createStoreMonitor,
  createStoreProject,
  deleteStoreMonitor,
  registerMonitorResponse,
  selectCompanies,
  selectMonitors,
  selectProjects,
  selectUser,
  selectUserLoggedIn,
  updateStoreMonitor,
  updateStoreProject,
  updateStoreUser,
} from 'src/store'

const SocketContext = createContext(null)

export const SocketProvider = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const isLoggedIn = useSelector(selectUserLoggedIn)
  const user = useSelector(selectUser)
  const projects = useSelector(selectProjects)
  const monitors = useSelector(selectMonitors)
  const companies = useSelector(selectCompanies)

  useEffect(() => {
    if (isConnected) {
      socket.emit('subscribe', {
        project: projects.map((project) => project.id),
        monitor: monitors.map((monitor) => monitor.id),
        company: companies.map((company) => company.id),
      })
    }
  }, [projects.length, monitors.length, isConnected])

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)
      console.log('Socket connected.')
    }

    const onDisconnect = () => {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('connect_error', (err) => {
      console.error(`Socket connection error due to ${err.message}`)
      console.log(err)
    })
    socket.on('monitor-responses', (data) => {
      registerMonitorResponse({
        monitorId: data.monitorId,
        responseTime: data.responseTime,
        timestamp: data.timestamp,
      })
    })
    socket.on('monitor-create', (data: IWebsiteMonitorMeta) => {
      createStoreMonitor(data)
    })
    socket.on('monitor-update', (data: IWebsiteMonitorMeta) => {
      updateStoreMonitor(data)
    })
    socket.on('monitor-delete', (data: IWebsiteMonitorMeta) => {
      deleteStoreMonitor(data.id)
    })
    socket.on('user-update', (data: IUserMeta) => {
      updateStoreUser(data)
    })
    socket.on('project-create', (data: IProjectMeta) => {
      console.log('create project:', data)
      createStoreProject(data)
    })
    socket.on('project-update', (data: IProjectMeta) => {
      updateStoreProject(data)
    })
    socket.onAny((event, ...args) => {
      console.log('Socket:', event, args)
    })

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off()
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn && user) {
      socket.auth = { userId: user.id }
      socket.connect()
    }
  }, [isLoggedIn])

  return <SocketContext.Provider value={null}></SocketContext.Provider>
}
