import { NETWORK_URL } from 'src/config'

const base = NETWORK_URL + '/api/v1'

export const NetworkRoutes = {
  user: {
    token: `${base}/user/token/`,
    login: `${base}/user/login/`,
    details: `${base}/user/me/`,
  },
  club: {
    list: `${base}/club/clubs/`,
    info: (id: number) => `${base}/club/clubs/${id}/`,
  },
  jukebox: {
    list: `${base}/jukebox/jukeboxes/`,
    activeLink: (jukeboxId: number) =>
      `${base}/jukebox/${jukeboxId}/active-link/`,
    refreshSpotifyToken: (jukeboxId: number) =>
      `${base}/jukebox/${jukeboxId}/active-link/?force-refresh=true`,
    connectDevice: (jukeboxId: number) =>
      `${base}/jukebox/${jukeboxId}/connect/`,
    playerState: (jukeboxId: number) =>
      `${base}/jukebox/${jukeboxId}/player-state/`,
    nextTracks: (jukeboxId: number) =>
      `${base}/jukebox/${jukeboxId}/tracks-queue/`,
  },
}
