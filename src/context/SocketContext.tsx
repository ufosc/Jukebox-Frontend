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
  onEvent:
    <T,>(ev: string, cb: (message: T) => void) =>
    () => {},
  isConnected: false,
  socket: {} as MutableRefObject<Socket<any, any> | null>,
})

export const SocketProvider = (props: { children: ReactNode }) => {
  const socket = useRef<Socket | null>(null)
  const isLoggedIn = useSelector(selectUserLoggedIn)
  const jukebox = useSelector(selectCurrentJukebox)
  const membership = useSelector(selectCurrentMembership)
  const token = ApiClient.getInstance().token
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (
      REACT_ENV === 'dev' ||
      !isLoggedIn ||
      !jukebox ||
      !membership ||
      !token
    ) {
      socket.current?.disconnect()
      socket.current = null
      setIsConnected(false)
      return
    }

    const role = membership.is_admin ? 'admin' : 'member'
    const nextSocket = connect(`${SOCKET_URL}`, {
      auth: {
        token,
      },
      query: {
        club_id: jukebox.club_id,
        role,
      },
    })

    socket.current = nextSocket

    const onConnect = () => {
      console.log('Socket connected.')
      setIsConnected(true)
    }

    const onDisconnect = () => {
      console.log('Socket disconnected.')
      setIsConnected(false)
    }

    const onException = (err: { message?: string }) => {
      console.error(`Socket connection error due to ${err.message}`)
    }

    nextSocket.on('connect', onConnect)
    nextSocket.on('disconnect', onDisconnect)
    nextSocket.on('exception', onException)
    nextSocket.onAny((event, ...args) => {
      console.debug('Socket received:', event, args)
    })

    return () => {
      nextSocket.off('connect', onConnect)
      nextSocket.off('disconnect', onDisconnect)
      nextSocket.off('exception', onException)
      nextSocket.offAny()
      nextSocket.disconnect()
      if (socket.current === nextSocket) {
        socket.current = null
      }
      setIsConnected(false)
    }
  }, [isLoggedIn, jukebox?.club_id, membership?.is_admin, token])

  const emitMessage = useCallback((ev: string, message: any) => {
    if (REACT_ENV === 'dev' || !socket.current) return
    console.debug(`Emitting message for ${ev}:`, message)
    socket.current.emit(ev, message)
  }, [])

  const onEvent = useCallback(<T,>(ev: string, cb: (message: T) => void) => {
    if (REACT_ENV === 'dev' || !socket.current) {
      return () => {}
    }

    const activeSocket = socket.current
    const wrappedCb = (message: T) => {
      console.debug(`Receiving message for ${ev}:`, message)
      cb(message)
    }

    activeSocket.on(ev, wrappedCb)

    return () => {
      activeSocket.off(ev, wrappedCb)
    }
  }, [])

  return (
    <SocketContext.Provider
      value={{ emitMessage, onEvent, isConnected, socket }}
    >
      {props.children}
    </SocketContext.Provider>
  )
}
