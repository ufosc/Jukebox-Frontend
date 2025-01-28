import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from 'react-router-dom'
import { App } from 'src/App'
import { adminRoutes, Dashboard } from 'src/apps/admin'
import { authRoutes } from 'src/apps/auth'
import { boardsRoutes } from 'src/apps/boards'
import { membersRoutes } from 'src/apps/members'
import { publicRoutes } from 'src/apps/public'
import { AuthGuard } from './components/AuthGuard'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <div>
            <strong>Apps:</strong>
            <ul>
              <li>
                <Link to="public">Public</Link> (Will be set to landing page
                once built out)
              </li>
              <li>
                <Link to="auth">Auth</Link>
              </li>
              <li>
                <Link to="admin">Admin</Link>
              </li>
              <li>
                <Link to="boards">Boards</Link>
              </li>
              <li>
                <Link to="members">Members</Link>
              </li>
            </ul>
          </div>
        ),
      },
      {
        path: 'public',
        children: publicRoutes,
      },
      {
        path: 'auth',
        children: authRoutes,
      },
      {
        path: 'admin',
        element: (
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        ),
        children: adminRoutes,
      },
      {
        path: 'boards',
        element: (
          <AuthGuard>
            <Outlet />
          </AuthGuard>
        ),
        children: boardsRoutes,
      },
      {
        path: 'members',
        children: membersRoutes,
      },
    ],
  },
])

export const Router = () => {
  return <RouterProvider router={routes} />
}
