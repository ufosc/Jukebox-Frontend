import { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AudioPlayer } from 'src/components'
import { PlayerContext } from 'src/context'
import {
  selectAccountLinks,
  selectCurrentClub,
  selectCurrentMembership,
  selectNextTracks,
} from 'src/store'
import { selectUserAccounts } from 'src/store/user'
import { formatDuration } from 'src/utils'
import { SpotifyPlayerAccount } from '../components/SpotifyPlayer/SpotifyPlayerAccount'
import { SpotifyPlayerDetail } from '../components/SpotifyPlayer/SpotifyPlayerDetail'
import { SpotifyPlayerInfo } from '../components/SpotifyPlayer/SpotifyPlayerInfo'
import { AdminHeader } from '../components/AdminHeader'

export const SpotifyPlayer = () => {
  const jukeboxLinks = useSelector(selectAccountLinks)
  const nextTracks = useSelector(selectNextTracks)
  const spotifyLinks = useSelector(selectUserAccounts)
  const currentClub = useSelector(selectCurrentClub)
  const currentMembership = useSelector(selectCurrentMembership)
  const { currentTrack, playerState, hasAux, accountConnected } =
    useContext(PlayerContext)

  return (
    <div className="spotify-player-page section">
      <AdminHeader title="Spotify Debug" />
      <div className="spotify-player-container grid">
        <div className="col-6">
          <div className="player-section">
            <h2 className="player-section__title">Now Playing</h2>
            {currentTrack ? (
              <>
                <div className="spotify-player-desc">
                  <div className="spotify-song-title">{currentTrack.name}</div>
                  <div className="spotify-song-author">
                    {currentTrack.artists?.join(', ') || 'Unknown Artist'}
                  </div>
                </div>

                <div className="detail-container">
                  <SpotifyPlayerDetail
                    firstDetail="Album"
                    secondDetail={currentTrack.album || 'Unavailable'}
                  />
                  <SpotifyPlayerDetail
                    firstDetail="Duration"
                    secondDetail={formatDuration(currentTrack.duration_ms)}
                  />
                  <SpotifyPlayerDetail
                    firstDetail="Playing"
                    secondDetail={
                      playerState?.is_playing ? 'Yes' : 'No'
                    }
                  />
                </div>
              </>
            ) : (
              <p>No track currently playing</p>
            )}

            <div className="audio-container">
              <AudioPlayer disableControls={hasAux}/>
            </div>
          </div>

          <div className="player-section">
            <h2 className="player-section__title">Player Status</h2>
            <div className="detail-container">
              <SpotifyPlayerDetail
                firstDetail="Account Connected"
                secondDetail={accountConnected ? 'Yes' : 'No'}
              />
              <SpotifyPlayerDetail
                firstDetail="Has AUX"
                secondDetail={hasAux ? 'Yes' : 'No'}
              />
              <SpotifyPlayerDetail
                firstDetail="Current Club"
                secondDetail={currentClub?.name || 'None'}
              />
              <SpotifyPlayerDetail
                firstDetail="User Role"
                secondDetail={currentMembership?.is_admin ? 'Admin' : 'Member'}
              />
            </div>
          </div>

          <div className="player-section">
            <h2 className="player-section__title">Next Tracks</h2>
            {nextTracks.length > 0 ? (
              <ol className="track-queue">
                {nextTracks.slice(0, 5).map((track, idx) =>
                  track ? (
                    <li key={track.track.id} className="track-queue__item">
                      <span className="track-queue__num">{idx + 1}</span>
                      <div className="track-queue__info">
                        <div className="track-queue__name">
                          {track.track.name}
                        </div>
                        <div className="track-queue__artist">
                          {track.track.artists.join(', ')}
                        </div>
                      </div>
                      <span className="track-queue__duration">
                        {formatDuration(track.track.duration_ms)}
                      </span>
                    </li>
                  ) : null,
                )}
              </ol>
            ) : (
              <p>No upcoming tracks</p>
            )}
          </div>
        </div>

        <div className="col-6">
          <div className="player-section">
            <h2 className="player-section__title">Connected Spotify Accounts</h2>
            {jukeboxLinks && jukeboxLinks.length > 0 ? (
              <div className="account-list">
                {jukeboxLinks
                  .filter((link) => link?.spotify_account?.id != null)
                  .map((link) => (
                    <SpotifyPlayerAccount
                      key={link.id}
                      account={link.spotify_account}
                      active={link.active}
                      actions={[]}
                    />
                  ))}
              </div>
            ) : (
              <p>No Spotify accounts connected to this jukebox</p>
            )}
          </div>

          <div className="player-section">
            <h2 className="player-section__title">Your Spotify Accounts</h2>
            {spotifyLinks && spotifyLinks.length > 0 ? (
              <div className="account-list">
                {spotifyLinks
                  .filter((account) => account?.id != null)
                  .map((account) => (
                    <SpotifyPlayerAccount
                      key={account.id}
                      account={account}
                      actions={[]}
                    />
                  ))}
              </div>
            ) : (
              <p>No Spotify accounts linked to your user</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
