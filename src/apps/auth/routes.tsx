import type { RouteObject } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Login, OauthReturn, Register } from './pages'

export const authRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <div>
        <strong>Routes:</strong>
        <ul>
          <li>
            <Link to="login">Login</Link>
          </li>
          <li>
            <Link to="register">Register</Link>
          </li>
        </ul>
      </div>
    ),
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'oauth-return',
    element: <OauthReturn />,
  },
]
