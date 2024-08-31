import { createContext, useEffect, useState } from 'react'
import { socket } from 'src/lib'

const SocketContext = createContext(null)

export const SocketProvider = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)

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

    socket.onAny((event, ...args) => {
      console.log('Socket:', event, args)
    })

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off()
    }
  }, [])

  return <SocketContext.Provider value={null}></SocketContext.Provider>
}
