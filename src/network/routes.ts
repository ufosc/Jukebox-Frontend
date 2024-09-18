import { NETWORK_URL } from 'src/config'

const base = NETWORK_URL + '/api'

export const NetworkRoutes = {
  user: {
    token: `${base}/user/token/`,
    details: `${base}/user/me/`,
  },
  group: {
    spotifyAuth: (id: string) => `${base}/api/group/${id}/spotify/auth`,
  },
}
