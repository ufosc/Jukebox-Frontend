import type { ReactNode } from 'react'
import { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { socket } from 'src/lib'
import { selectUser, selectUserLoggedIn } from 'src/store'

export const SocketContext = createContext({
  emitMessage: (ev: string, message: any) => {},
})

export const SocketProvider = (props: { children: ReactNode }) => {
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

  const emitMessage = (ev: string, message: any) => {
    if (isConnected) {
      socket.emit(ev, message)
    } else {
      console.error('Socket not connected, cannot emit:', message)
    }
  }

  return (
    <SocketContext.Provider value={{ emitMessage }}>
      {props.children}
    </SocketContext.Provider>
  )
}
