import type { RouteObject } from 'react-router-dom'
import { Home } from './pages/Home'

export const publicRoutes: RouteObject[] = [
  {
    index: true,
    element: <Home />,
  },
]
