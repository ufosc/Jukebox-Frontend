import { Navigate, type RouteObject } from 'react-router-dom'
import { Overview } from 'src/apps/admin/pages'
import { Music } from './pages/Music'
import { MusicQueue } from './pages/MusicQueue'
import { MusicSearch } from './pages/MusicSearch'
import { Settings } from './pages/Settings'

export const membersRoutes: RouteObject[] = [
  {
    index: true,
    element: <Overview />,
  },
  {
    path: 'music',
    element: <Music />,
    children: [
      {
        path: '',
        element: <Navigate to="queue" />,
      },
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
    path: 'settings',
    element: <Settings />,
  },
]
