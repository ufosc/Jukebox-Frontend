import { connect } from 'socket.io-client'
import { REACT_ENV, SOCKET_URL } from 'src/config'

const getSocketInstance = () => {
  if (REACT_ENV !== 'dev' && REACT_ENV !== 'test') {
    // io(SOCKET_URL, { withCredentials: true })
    return connect(SOCKET_URL, { autoConnect: false })
  } else {
    return {
      on: (ev: string, listener: (...args: any[]) => void) => {},
      off: (ev: string, listener: (...args: any[]) => void) => {},
      onAny: (listener: (...args: any[]) => void) => {},
      connect: () => {},
    } as ReturnType<typeof connect>
  }
}

export const socket = getSocketInstance()
