import { NETWORK_URL } from 'src/config'

const base = NETWORK_URL + '/api'

export const NetworkRoutes = {
  user: {
    token: `${base}/user/token/`,
    details: `${base}/user/me/`,
  },
  group: {
    info: (id: string) => `${base}/group/groups/${id}`,
    spotifyAuth: (id: string) => `${base}/group/${id}/spotify/auth`,
  },
}
