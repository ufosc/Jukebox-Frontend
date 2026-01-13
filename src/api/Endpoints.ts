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
    memberList: (id: number) => `${CLUBS_V1}/club/clubs/${id}/members/`,
    membershipList: `${CLUBS_V1}/club/club-memberships/`,
    membershipDetail: (id: number) =>
      `${CLUBS_V1}/club/club-memberships/${id}/`,
  },
  jukebox: {
    list: `${JUKEBOX_V1}/jukebox/jukeboxes`,
    listForClub: (clubId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes?club_id=${clubId}`,
    detail: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}`,
    accountLinkList: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/account-links/`,
    accountLinkActive: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/account-links/active`,
    accountLinkActiveRefresh: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/account-links/active?refresh=true`,
    connectDevice: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/player/device`,
    playerState: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/player`,
    search: (jukeboxId: number) => `${JUKEBOX_V1}/track/tracks/`,
    queueTrackList: (jukeboxId: number, jukeSessionId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/juke-sessions/${jukeSessionId}/queue`,
    queueTrackDetail: (jukeboxId: number, jukeSessionId: number, id: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/juke-sessions/${jukeSessionId}/queue/${id}`,
    playerAction: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/player/action`,
    jukeSessionList: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/juke-sessions/`,
    currentJukeSession: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/juke-sessions/current/`,
    jukeSessionMembership: (jukeboxId: number, jukeSessionId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/juke-sessions/${jukeSessionId}/membership/`,
    joinJukeSession: (jukeboxId: number, jukeSessionId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/juke-sessions/${jukeSessionId}/members/join`,
    createJukeSession: (jukeboxId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/juke-sessions`,
    getJukeSessionMembers: (jukeboxId: number, jbxSessionId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/juke-sessions/${jbxSessionId}/members`,
    getJukeSessionQueue: (jukeboxId: number, jukeSessionId: number) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/juke-sessions/${jukeSessionId}/queue`,
    joinJukeSessionCode: (jukeboxId: number, joinCode: string) =>
      `${JUKEBOX_V1}/jukebox/jukeboxes/${jukeboxId}/juke-sessions/${joinCode}/members/code`,
  },
  spotify: {
    login: (redirectUri: string, jukeboxId?: number) =>
      `${JUKEBOX_V1}/spotify/login/?redirectUri=${redirectUri}${jukeboxId != null ? '&jukeboxId=' + jukeboxId : ''}`,
    accountList: `${JUKEBOX_V1}/spotify/accounts`,
    accountDetail: (id: number) => `${JUKEBOX_V1}/spotify/accounts/${id}`,
  },
})
