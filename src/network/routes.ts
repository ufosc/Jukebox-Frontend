import { CLUBS_URL, JUKEBOX_URL } from 'src/config'

const jukeboxApi = JUKEBOX_URL + '/api/v1'
const clubsApi = CLUBS_URL + '/api/v1'

export const NetworkRoutes = {
  user: {
    token: `${clubsApi}/user/token/`,
    login: `${clubsApi}/user/login/`,
    details: `${clubsApi}/user/me/`,
  },
  club: {
    list: `${clubsApi}/club/clubs/`,
    info: (id: number) => `${clubsApi}/club/clubs/${id}/`,
  },
  jukebox: {
    list: `${jukeboxApi}/jukebox/jukeboxes/`,
    activeLink: (jukeboxId: number) =>
      `${jukeboxApi}/jukebox/${jukeboxId}/active-link/`,
    refreshSpotifyToken: (jukeboxId: number) =>
      `${jukeboxApi}/jukebox/${jukeboxId}/active-link/`,
    // `${base}/jukebox/${jukeboxId}/active-link/?force-refresh=true`,
    connectDevice: (jukeboxId: number) =>
      `${jukeboxApi}/jukebox/${jukeboxId}/connect/`,
    playerState: (jukeboxId: number) =>
      `${jukeboxApi}/jukebox/${jukeboxId}/player-state/`,
    nextTracks: (jukeboxId: number) =>
      `${jukeboxApi}/jukebox/${jukeboxId}/tracks-queue/`,
  },
}
