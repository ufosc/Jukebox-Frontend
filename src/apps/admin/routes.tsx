import { Outlet, type RouteObject } from 'react-router-dom'
import { Dashboard } from './layout/Dashboard'
import { Overview } from './pages'
import { AdminBoard } from './pages/AdminBoard'
import { MusicSearch } from './pages/MusicSearch'
import { Music } from './pages/Music'
import { MusicQueue } from './pages/MusicQueue'

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
    element: <Music />,
    children: [
      {
        path: 'search',
        element: <MusicSearch />,
      },
      {
        path: 'queue',
        element: <MusicQueue />,
      },
    ],
  },
  {
    path: 'jam-sessions',
    // element: <div>Jam Sessions</div>,
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