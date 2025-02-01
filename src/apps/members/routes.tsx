import type { RouteObject } from 'react-router-dom'
import Home from './pages/Home.tsx'

export const membersRoutes: RouteObject[] = [
  {
    index: true,
    element: <Home />,
  },
]
