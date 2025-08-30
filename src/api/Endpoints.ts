import { CLUBS_URL, JUKEBOX_URL } from 'src/config'

const JUKEBOX_V1 = JUKEBOX_URL + '/api/v1'
const CLUBS_V1 = CLUBS_URL + '/api/v1'

export const ApiEndpoints = Object.freeze({
  user: {
    oauthRedirect: `${CLUBS_V1}/user/oauth/provider/`,
    token: `${CLUBS_V1}/user/token/`,
    login: `${CLUBS_V1}/user/token/`,
    info: `${CLUBS_V1}/user/me/`,
    oauth: {
      google: `${CLUBS_URL}/api/oauth/browser/v1/auth/provider/redirect`,
    },
  },
  club: {
    list: `${CLUBS_V1}/club/clubs/`,
    detail: (id: number) => `${CLUBS_V1}/club/clubs/${id}/`,
    memberList: (id: number) => `${CLUBS_V1}/club/clubs/${id}/members`,
    membershipList: `${CLUBS_V1}/club/club-memberships/`,
  },
  jukebox: {
    list: `${JUKEBOX_V1}/jukebox/jukeboxes`,
    listForClub: (clubId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes?club_id=${clubId}`,
    detail: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}`,
    accountLinkList: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/account-links`,
    accountLinkActive: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/account-links/active`,
    accountLinkActiveRefresh: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/account-links/active?force-refresh=true`,
    connectDevice: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/player/device`,
    playerState: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/player`,
    search: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes${jukeboxId}/search`,
    queueTrackList: (jukeboxId: number, jukeSessionId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/juke-sessions/${jukeSessionId}/queue`,
    queueTrackDetail: (jukeboxId: number, jukeSessionId: number, id: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/juke-sessions/${jukeSessionId}/queue/${id}`,
    jukeSessionList: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/juke-sessions/`,
  },
  spotify: {
    login: (redirectUri: string, jukeboxId?: number) =>
      `${JUKEBOX_V1}/spotify/login/?redirectUri=${redirectUri}${jukeboxId != null ? '&jukeboxId=' + jukeboxId : ''}`,
    accountList: `${JUKEBOX_V1}/spotify/accounts`,
    accountDetail: (id: number) => `${JUKEBOX_V1}/spotify/accounts/${id}`,
  },
})
