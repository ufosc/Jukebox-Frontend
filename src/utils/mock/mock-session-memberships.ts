// Citation: ChatGPT
export const mockSessionMemberships = {
  memberships: [
    {
      juke_session: 1,
      member: {
        name: 'Jim',
        role: 'Member',
        joined: '5m ago',
        queued: '5 tracks',
        likes: '85%',
        sessions: 10,
      },
      queued_tracks: [],
    },
    {
      juke_session: 1,
      member: {
        name: 'Jim',
        role: 'Admin',
        joined: '5m ago',
        queued: '5 tracks',
        likes: '85%',
        sessions: 10,
      },
      queued_tracks: [],
    },
    {
      juke_session: 1,
      member: {
        name: 'REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
        role: 'Member',
        joined: '5m ago',
        queued: '5 tracks',
        likes: '85%',
        sessions: 10,
      },
      queued_tracks: [],
    },
    {
      juke_session: 1,
      member: {
        name: 'JOIASD ASD ASDAS D',
        role: 'Admin',
        joined: '5m ago',
        queued: '5 tracks',
        likes: '85%',
        sessions: 10,
      },
      queued_tracks: [],
    },
    // repeat baseline Jim entries…
    ...Array.from({ length: 34 }).map((_, i) => ({
      juke_session: 1,
      member: {
        name:
          i === 5
            ? 'SupercalifragilisticexpialidociousLongNameOverflowTest'
            : i === 12
              ? 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
              : i === 20
                ? 'NameWithExcessivelyVerboseAndRedundantDetailsToTriggerOverflowHandling'
                : i === 27
                  ? 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'
                  : 'Jim',
        role: 'Member',
        joined: '5m ago',
        queued: '5 tracks',
        likes: '85%',
        sessions: 10,
      },
      queued_tracks: [],
    })),
  ],
  count: 38,
}
