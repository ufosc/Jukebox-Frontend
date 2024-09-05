import { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { socket } from 'src/lib'
import { selectUser, selectUserLoggedIn } from 'src/store'

const SocketContext = createContext(null)

export const SocketProvider = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const isLoggedIn = useSelector(selectUserLoggedIn)
  const user = useSelector(selectUser)

  useEffect(() => {
    if (isConnected) {
      socket.emit('subscribe', {})
    }
  }, [isConnected])

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
    socket.on('ping-pong', (data: string) => {
      window.alert(`Pong: ${data}`)
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
  }, [isLoggedIn, user])

  return <SocketContext.Provider value={null}></SocketContext.Provider>
}
