import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Admin, Dashboard } from './admin'
import { Login, Register } from './auth'
import { Board, Board1, BoardList } from './boards'
import { Members } from './members'
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
        element: <Board />,
        children: [
          {
            index: true,
            element: <BoardList />,
          },
          {
            path: 'board-1',
            element: <Board1 />,
          },
        ],
      },
      {
        path: 'members',
        element: <Members />,
      },
    ],
  },
])

export const Router = () => {
  return <RouterProvider router={routes} />
}
