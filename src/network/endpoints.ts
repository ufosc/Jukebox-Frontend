import { CLUBS_URL, JUKEBOX_URL } from 'src/config'

const jukeboxApi = JUKEBOX_URL + '/api/v1'
const clubsApi = CLUBS_URL + '/api/v1'

export const NetworkEndpoints = Object.freeze({
  user: {
    token: `${clubsApi}/user/token/`,
    login: `${clubsApi}/user/token/`,
    info: `${clubsApi}/user/me/`,
    oauth: {
      google: `${CLUBS_URL}/api/oauth/browser/v1/auth/provider/redirect`,
    },
  },
  club: {
    list: `${clubsApi}/club/clubs/`,
    get: (id: number) => `${clubsApi}/club/clubs/${id}/`,
    members: (id: number) => `${clubsApi}/club/clubs/${id}/members`
  },
  jukebox: {
    list: `${jukeboxApi}/jukebox/jukeboxes/`,
    getJbk: (jukeboxId : number) => 
      `${jukeboxApi}/jukebox/jukeboxes/${jukeboxId}`,
    getClubList: (clubId: number) =>
      `${jukeboxApi}/jukebox/jukeboxes/club/${clubId}`,
    activeLink: (jukeboxId: number) =>
      `${jukeboxApi}/jukebox/${jukeboxId}/active-link/`,
    getSpotifyAccount: (jukeboxId: number) =>
      `${jukeboxApi}/jukebox/${jukeboxId}/active-link/?force-refresh=true`,
    connectDevice: (jukeboxId: number) =>
      `${jukeboxApi}/jukebox/${jukeboxId}/connect/`,
    playerState: (jukeboxId: number) =>
      `${jukeboxApi}/jukebox/${jukeboxId}/player-state/`,
    nextTracks: (jukeboxId: number) =>
      `${jukeboxApi}/jukebox/${jukeboxId}/tracks-queue/`,
    links: (jukeboxId: number) =>
      `${jukeboxApi}/jukebox/${jukeboxId}/links/`,
    search: (jukeboxId: number) =>
      `${jukeboxApi}/jukebox/${jukeboxId}/search`,
    queue: (jukeboxId: number)=>
      `${jukeboxApi}/jukebox/${jukeboxId}/tracks-queue`,
  },
  spotify: {
    login: (redirectUri: string, jukeboxId?: number) =>
      `${jukeboxApi}/spotify/login/?redirectUri=${redirectUri}${jukeboxId != null ? '&jukeboxId=' + jukeboxId : ''}`,
    links: `${jukeboxApi}/spotify/links`,
  },
})
