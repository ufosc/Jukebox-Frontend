import { Outlet } from 'react-router-dom'
import { SocketProvider, Theme } from './context'

export const App = () => {
  return (
    <Theme>
      <SocketProvider />
      <Outlet />
    </Theme>
  )
}
