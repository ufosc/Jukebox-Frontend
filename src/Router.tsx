import { RouterProvider, createBrowserRouter } from 'react-router-dom'
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
        element: <div>Index</div>,
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
