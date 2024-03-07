import { Outlet } from 'react-router-dom'
import { Theme } from './Theme'

export const App = () => {
  return (
    <Theme>
      <Outlet />
    </Theme>
  )
}
