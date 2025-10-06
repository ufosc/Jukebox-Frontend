import { Navigate, type RouteObject } from 'react-router-dom'
import { Overview } from './pages'
import { AdminBoards } from './pages/AdminBoards'
import { CreateJukebox } from './pages/CreateJukebox'
import { Music } from './pages/Music'
import { MusicQueue } from './pages/MusicQueue'
import { MusicSearch } from './pages/MusicSearch'
import { Settings } from './pages/Settings'
import { SpotifyPlayer } from './pages/SpotifyPlayer'
import { Player } from './pages/Player'
import { MemberDetail } from './pages/members/MemberDetail'
import { MemberNew } from './pages/members/MemberNew'
import { MembersList } from './pages/members/MembersList'
import { MembersOverview } from './pages/members/MembersOverview'
import { JukeSession } from './pages/JukeSession'
import { ActiveJukeSession } from './pages/JukeSession/ActiveJukeSession'
import { JukeSessionMembers } from './pages/JukeSession/JukeSessionMembers'

export const adminRoutes: RouteObject[] = [
  {
    index: true,
    element: <Overview />,
  },
  {
    path: 'createJbx',
    element: <CreateJukebox />,
  },
  {
    path: 'debug',
    element: <SpotifyPlayer />,
  },
  {
    path: 'player',
    element: <Player />,
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
    element: <JukeSession />,
    children: [
      {
        path: 'active',
        element: <ActiveJukeSession />,
      },
      {
        path: 'members',
        element: <JukeSessionMembers />,
      },
      /*
      {
        path: 'history',
        element: <div>FIX ME</div>,
      },
      {
        path: 'invite',
        element: <div>Invite Guests</div>,
      },
      */
    ],
  },
  {
    path: 'members',
    children: [
      {
        index: true,
        element: <MembersOverview />,
      },
      {
        path: 'list',
        element: <MembersList />,
      },
      {
        path: 'new',
        element: <MemberNew />,
      },
      {
        path: ':id',
        element: <MemberDetail />,
      },
    ],
  },
  {
    path: 'settings',
    element: <Settings />,
  },
  {
    path: 'zjukebox',
    element: <CreateJukebox />,
  },
]
