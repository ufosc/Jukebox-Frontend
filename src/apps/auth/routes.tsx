import type { RouteObject } from 'react-router'
import { AdminLogin, AdminRegister, MemberLogin, MemberRegister } from './pages'

export const authRoutes: RouteObject[] = [
  {
    index: true,
    element: <div>Auth index</div>,
  },
  {
    path: 'admin',
    element: <div>Admin auth index. Login or register?</div>,
    children: [
      {
        path: 'login',
        element: <AdminLogin />,
      },
      {
        path: 'register',
        element: <AdminRegister />,
      },
    ],
  },
  {
    path: 'members',
    element: <div>Members auth index. Login/register as Member/Guest?</div>,
    children: [
      {
        path: 'login',
        element: <MemberLogin />,
      },
      {
        path: 'register',
        element: <MemberRegister />,
      },
    ],
  },
]
