import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { App } from 'src/App'
import { adminRoutes } from 'src/apps/admin'
import { authRoutes } from 'src/apps/auth'
import { boardsRoutes } from 'src/apps/boards'
import { membersRoutes } from 'src/apps/members'

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
        path: 'auth',
        children: authRoutes,
      },
      {
        path: 'admin',
        children: adminRoutes,
      },
      {
        path: 'boards',
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
