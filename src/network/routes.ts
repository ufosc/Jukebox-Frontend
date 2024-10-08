import { NETWORK_URL } from 'src/config'

const base = NETWORK_URL + '/api/v1'

export const NetworkRoutes = {
  user: {
    token: `${base}/user/token/`,
    details: `${base}/user/me/`,
  },
  club: {
    info: (id: string) => `${base}/club/clubs/${id}`,
    spotifyAuth: (id: string) => `${base}/club/${id}/spotify/auth`,
  },
}
