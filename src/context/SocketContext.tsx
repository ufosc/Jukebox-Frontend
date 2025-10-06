import type { ReactNode } from 'react'
import { createContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { connect, Socket } from 'socket.io-client'
import { ApiClient } from 'src/api'
import { REACT_ENV, SOCKET_URL } from 'src/config'
import {
  selectCurrentJukebox,
  selectCurrentMembership,
  selectUserLoggedIn,
} from 'src/store'

export const SocketContext = createContext({
  emitMessage: <T,>(ev: string, message: T) => {},
  onEvent: <T,>(ev: string, cb: (message: T) => void) => {},
})

export const SocketProvider = (props: { children: ReactNode }) => {
  const socket = useRef<Socket | null>(null)
  const isLoggedIn = useSelector(selectUserLoggedIn)
  const [subEvents, setSubEvents] = useState<string[]>([])
  const jukebox = useSelector(selectCurrentJukebox)
  const membership = useSelector(selectCurrentMembership)
  const token = ApiClient.getInstance().token

  useEffect(() => {
    console.log('Is Socket Logged In ', isLoggedIn)
    console.log(isLoggedIn, jukebox, membership)
    if (isLoggedIn && jukebox) {
      const role = membership?.is_admin ? 'admin' : 'member'
      const clubId = jukebox.club_id
      console.log('Shaking Socket Hands')
      console.log(clubId, role, token)
      console.log(SOCKET_URL)
      socket.current = connect(`${SOCKET_URL}`, {
        auth: {
          token: token,
        },
        query: {
          club_id: clubId,
          role: role,
        },
      })
    }
  }, [isLoggedIn, jukebox, membership])

  useEffect(() => {
    if (socket.current) {
      socket.current.emit('subscribe', {})
    }
  }, [socket])

  useEffect(() => {
    if (REACT_ENV === 'dev' || !socket.current) return

    const onConnect = () => {
      console.log('Socket connected.')
    }

    const onDisconnect = () => {
      console.log('Socket disconnected.')
    }

    socket.current.on('connect', onConnect)
    socket.current.on('disconnect', onDisconnect)
    socket.current.on('exception', (err) => {
      console.error(`Socket connection error due to ${err.message}`)
    })
    socket.current.on('ping-pong', (data: string) => {
      window.alert(`Pong: ${data}`)
    })

    socket.current.onAny((event, ...args) => {
      console.debug('Socket received:', event, args)
    })

    return () => {
      if (socket.current) {
        socket.current.off('connect', onConnect)
        socket.current.off('disconnect', onDisconnect)
        socket.current.off()
      }
    }
  }, [])

  const emitMessage = (ev: string, message: any) => {
    if (REACT_ENV === 'dev' || !socket.current) return
    console.log('Emitting Message')
    socket.current.emit(ev, message)
  }

  const onEvent = <T,>(ev: string, cb: (message: T) => void) => {
    if (REACT_ENV === 'dev' || !socket.current) return

    console.log('Event Binded: ', ev)

    if (subEvents.includes(ev)) {
      socket.current.off(ev)
    } else {
      setSubEvents((prev) => [...prev, ev])
    }
    socket.current.on(ev, cb)
  }

  return (
    <SocketContext.Provider value={{ emitMessage, onEvent }}>
      {props.children}
    </SocketContext.Provider>
  )
}
