import type { RouteObject } from 'react-router'
import { Dashboard } from './layout/Dashboard'
import { Overview } from './pages'
import { AdminBoard } from './pages/adminBoard'

export const adminOutlet = <Dashboard />

export const adminRoutes: RouteObject[] = [
  {
    index: true,
    element: <Overview />,
  },
  {
    path: 'boards',
    element: <AdminBoard />,
  },
  {
    path: 'music',
    element: <div>Music</div>,
    children: [
      {
        path: 'search',
        element: <div>Music Search</div>,
      },
      {
        path: 'queue',
        element: <div>Music Song Queue</div>,
      },
    ],
  },
  {
    path: 'jam-sessions',
    element: <div>Jam Sessions</div>,
    children: [
      {
        path: 'leaderboard',
        element: <div>Leader Board</div>,
      },
      {
        path: 'invite',
        element: <div>Invite Guests</div>,
      },
    ],
  },
  {
    path: 'members',
    element: <div>Members Overview</div>,
    children: [
      {
        path: 'all',
        element: <div>List all members</div>,
      },
      {
        path: 'new',
        element: <div>Add new member</div>,
      },
    ],
  },
  {
    path: 'settings',
    element: <div>Settings</div>,
  },
]
