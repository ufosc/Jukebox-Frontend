import type { ReactNode } from 'react'
import { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { REACT_ENV } from 'src/config'
import { socket } from 'src/lib'
import { selectUser, selectUserLoggedIn } from 'src/store'

export const SocketContext = createContext({
  emitMessage: <T,>(ev: string, message: T) => {},
  onEvent: <T,>(ev: string, cb: (message: T) => void) => {},
  isConnected: false,
})

export const SocketProvider = (props: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const isLoggedIn = useSelector(selectUserLoggedIn)
  const user = useSelector(selectUser)
  const [subEvents, setSubEvents] = useState<string[]>([])

  useEffect(() => {
    if (isConnected) {
      socket.emit('subscribe', {})
    }
  }, [isConnected])

  useEffect(() => {
    if (REACT_ENV === 'dev') return

    const onConnect = () => {
      setIsConnected(true)
      console.log('Socket connected.')
    }

    const onDisconnect = () => {
      setIsConnected(false)
      console.log('Socket disconnected.')
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('connect_error', (err) => {
      console.error(`Socket connection error due to ${err.message}`)
    })
    socket.on('ping-pong', (data: string) => {
      window.alert(`Pong: ${data}`)
    })

    socket.onAny((event, ...args) => {
      console.debug('Socket received:', event, args)
    })

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off()
    }
  }, [])

  useEffect(() => {
    if (REACT_ENV === 'dev') return

    if (isLoggedIn && user) {
      socket.auth = { userId: user.id }
      socket.connect()
    }
  }, [isLoggedIn, user])

  const emitMessage = (ev: string, message: any) => {
    if (REACT_ENV === 'dev') return

    socket.connect()
    if (isConnected) {
      socket.emit(ev, message)
    } else {
      console.error('Socket not connected, cannot emit:', message)
    }
  }

  const onEvent = <T,>(ev: string, cb: (message: T) => void) => {
    if (REACT_ENV === 'dev') return

    if (subEvents.includes(ev)) {
      socket.off(ev)
    } else {
      setSubEvents((prev) => [...prev, ev])
    }
    socket.connect()
    socket.on(ev, cb)
  }

  return (
    <SocketContext.Provider value={{ isConnected, emitMessage, onEvent }}>
      {props.children}
    </SocketContext.Provider>
  )
}
