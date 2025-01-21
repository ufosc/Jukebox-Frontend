import { Navigate, type RouteObject } from 'react-router-dom'
import { Overview } from './pages'
import { AdminBoards } from './pages/AdminBoards'
import { Music } from './pages/Music'
import { MusicQueue } from './pages/MusicQueue'
import { MusicSearch } from './pages/MusicSearch'
import { Settings } from './pages/Settings'
import { SpotifyPlayer } from './pages/SpotifyPlayer'

export const adminRoutes: RouteObject[] = [
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
    element: <Settings />,
  },
]
