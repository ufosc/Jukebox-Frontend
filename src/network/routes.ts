import { NETWORK_URL } from 'src/config'

const base = NETWORK_URL + '/api/v1'

export const NetworkRoutes = {
  user: {
    token: `${base}/user/token/`,
    details: `${base}/user/me/`,
  },
  club: {
    info: (id: number) => `${base}/club/clubs/${id}`,
  },
  jukebox: {
    list: `${base}/jukebox/jukeboxes`,
    activeLink: (id: number) => `${base}/jukebox/${id}/active-link/`,
    connectDevice: (id: number) => `${base}/jukebox/${id}/connect/`,
  },
}
