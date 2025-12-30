import type { MutableRefObject, ReactNode } from 'react'
import { createContext, useCallback, useEffect, useRef, useState } from 'react'
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
  socket: {} as MutableRefObject<Socket<any, any> | null>,
})

export const SocketProvider = (props: { children: ReactNode }) => {
  const socket = useRef<Socket | null>(null)
  const isLoggedIn = useSelector(selectUserLoggedIn)
  const [subEvents, setSubEvents] = useState<string[]>([])
  const [callbacks, setCallbacks] = useState<Record<string, any>>({})
  const jukebox = useSelector(selectCurrentJukebox)
  const membership = useSelector(selectCurrentMembership)
  const token = ApiClient.getInstance().token
  const [socketLoggedIn, setSocketLoggedIn] = useState(false)

  useEffect(() => {
    if (isLoggedIn && jukebox) {
      console.log('socket token:', token)
      const role = membership?.is_admin ? 'admin' : 'member'
      const clubId = jukebox.club_id
      socket.current = connect(`${SOCKET_URL}`, {
        auth: {
          token: token,
        },
        query: {
          club_id: clubId,
          role: role,
        },
      })
      setSocketLoggedIn(true)
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
    console.debug(`Emitting message for ${ev}:`, message)
    socket.current.emit(ev, message)
  }

  const onEvent = useCallback(
    <T,>(ev: string, cb: (message: T) => void) => {
      if (REACT_ENV === 'dev') return

      const wrappedCb = (message: T) => {
        console.debug(`Receiving message for ${ev}:`, message)
        return cb(message)
      }
      // socket.current.on(ev, wrappedCb)
      setCallbacks((prev) => ({ ...prev, [ev]: wrappedCb }))
    },
    [setCallbacks],
  )

  useEffect(() => {
    console.log('current:', socket.current)
    console.log('logged in:', socketLoggedIn)
    if (!socket.current || !socketLoggedIn) return
    console.log('callbacks:', callbacks)

    for (const [ev, cb] of Object.entries(callbacks)) {
      console.log('registering event:', ev)
      socket.current.on(ev, cb)
    }
  }, [
    Object.keys(callbacks),
    socket.current,
    socket.current?.active,
    socketLoggedIn,
  ])

  return (
    <SocketContext.Provider value={{ emitMessage, onEvent, socket }}>
      {props.children}
    </SocketContext.Provider>
  )
}
