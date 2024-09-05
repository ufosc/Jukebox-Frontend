import { NETWORK_URL } from 'src/config'

const base = NETWORK_URL + '/api'

export const NetworkRoutes = {
  user: {
    token: `${base}/user/login/`,
    details: `${base}/user/me/`,
  },
}
