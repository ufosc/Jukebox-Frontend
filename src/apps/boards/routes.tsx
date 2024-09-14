import type { RouteObject } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { BoardOutlet } from './pages/BoardOutlet'

export const boardsRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <div>
        <strong>Boards Routes:</strong>
        <ul>
          <li>
            <Link to="1">Board 1</Link>
          </li>
          <li>
            <Link to="2">Board 2</Link>
          </li>
          <li>
            <Link to="3">Board 3</Link>
          </li>
        </ul>
      </div>
    ),
  },
  {
    path: ':id',
    element: <BoardOutlet />,
  },
]
