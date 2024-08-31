import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Dashboard } from './context/Dashboard'
import { DevGuide } from './docs'
import {
  AddMonitor,
  EditMonitor,
  Events,
  Login,
  MonitorDetail,
  MonitorEvents,
  MonitorIncidents,
  MonitorSettings,
  MonitorSubscribers,
  MonitorSummary,
  Monitors,
  Overview,
  Settings,
} from './pages'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        element: <Dashboard />,
        children: [
          { index: true, element: <Overview /> },
          { path: '/settings', element: <Settings /> },
          { path: '/events', element: <Events /> },
          {
            path: '/monitors',
            children: [
              { index: true, element: <Monitors /> },
              { path: 'add', element: <AddMonitor /> },
              {
                path: ':id',
                element: <MonitorDetail />,
                children: [
                  { index: true, element: <MonitorSummary /> },
                  { path: 'subscribers', element: <MonitorSubscribers /> },
                  { path: 'incidents', element: <MonitorIncidents /> },
                  { path: 'events', element: <MonitorEvents /> },
                  { path: 'settings', element: <MonitorSettings /> },
                ],
              },
              { path: ':id/edit', element: <EditMonitor /> },
            ],
          },
        ],
      },
      { path: '/dev-guide', element: <DevGuide /> },
    ],
  },
])

export const Router = () => {
  return <RouterProvider router={routes} />
}
