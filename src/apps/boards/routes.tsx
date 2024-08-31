import type { RouteObject } from 'react-router'
import { BoardOutlet } from './pages/BoardOutlet'

export const boardsRoutes: RouteObject[] = [
  {
    index: true,
    element: <div>Must select board</div>,
  },
  {
    path: ':id',
    element: <BoardOutlet />,
  },
]
