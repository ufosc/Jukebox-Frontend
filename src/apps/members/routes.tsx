import { Navigate, type RouteObject } from 'react-router-dom'
import { Overview } from './pages'
import { AdminBoards } from 'src/apps/admin/pages/AdminBoards'
import { Music } from 'src/apps/admin/pages/Music'
import { MusicQueue } from 'src/apps/admin/pages/MusicQueue'
import { MusicSearch } from 'src/apps/admin/pages/MusicSearch'
import { Settings } from './pages/Settings'
import { SpotifyPlayer } from 'src/apps/admin/pages/SpotifyPlayer'

export const membersRoutes: RouteObject[] = [
  {
    index: true,
    element: <Overview />,
  },
  {
    path: 'player',
    element: <SpotifyPlayer />,
  },
  {
    path: 'boards',
    element: <AdminBoards />,
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
    path: 'settings',
    element: <Settings />,
  },
]
