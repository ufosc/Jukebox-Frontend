import type { RouteObject } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AdminLogin, AdminRegister, MemberLogin, MemberRegister } from './pages'

export const authRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <div>
        <strong>Routes:</strong>
        <ul>
          <li>
            <Link to="admin">Admin</Link>
          </li>
          <li>
            <Link to="members">Members</Link>
          </li>
        </ul>
      </div>
    ),
  },
  {
    path: 'admin',
    children: [
      {
        index: true,
        element: (
          <div>
            Admin auth index.
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
        element: <AdminLogin />,
      },
      {
        path: 'register',
        element: <AdminRegister />,
      },
    ],
  },
  {
    path: 'members',
    element: <div>Members auth index. Login/register as Member/Guest?</div>,
    children: [
      {
        path: 'login',
        element: <MemberLogin />,
      },
      {
        path: 'register',
        element: <MemberRegister />,
      },
    ],
  },
]
