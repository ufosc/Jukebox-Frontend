import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Admin } from './admin/Admin'
import { Dashboard } from './admin/Dashboard/Dashboard'
import { Login } from './auth/Login'
import { Register } from './auth/Register'
import { DevGuide } from './pages'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <DevGuide />,
      },
      {
        path: 'auth',
        children: [
          {
            index: true,
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
        ],
      },
      {
        path: 'admin',
        element: <Admin />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
      {
        path: 'boards',
        element: <div>Boards path</div>,
      },
      {
        path: 'members',
        element: <div>Members path</div>,
      },
    ],
  },
])

export const Router = () => {
  return <RouterProvider router={routes} />
}
