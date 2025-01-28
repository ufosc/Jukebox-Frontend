import { useContext, useRef } from 'react'
import { useSelector } from 'react-redux'
import { AudioPlayer, Form, FormSelectGroup, FormSubmit } from 'src/components'
import { REACT_ENV } from 'src/config'
import { SpotifyPlayerContext } from 'src/context'
import { authenticateLink } from 'src/store'
import {
  selectCurrentTrack,
  selectJukeboxLinks,
  selectNextTracks,
} from 'src/store/jukebox'
import { formatDuration } from 'src/utils'
import { SpotifyPlayerAccount } from '../components/SpotifyPlayer/SpotifyPlayerAccount'
import { SpotifyPlayerDetail } from '../components/SpotifyPlayer/SpotifyPlayerDetail'
import { SpotifyPlayerInfo } from '../components/SpotifyPlayer/SpotifyPlayerInfo'
import './SpotifyPlayer.scss'

export const SpotifyPlayer = () => {
  const jukeboxLinks = useSelector(selectJukeboxLinks)
  const currentTrack = useSelector(selectCurrentTrack)
  const nextTracks = useSelector(selectNextTracks)

  const {
    deviceIsActive: isActive,
    spotifyIsConnected: isConnected,
    connectDevice,
  } = useContext(SpotifyPlayerContext)

  const connectLinkIdRef = useRef<HTMLSelectElement>(null)

  const handleConnectPlayback = async () => {
    if (!connectLinkIdRef.current) return

    const link = jukeboxLinks?.find(
      (link) => link.id === +connectLinkIdRef.current!.value,
    )

    if (!link)
      throw new Error(`Link with id ${connectLinkIdRef.current} not found.`)

    await authenticateLink(link)
  }

  return (
    <>
      <div className="spotify-player-title">Spotify Player</div>
      <div className="spotify-player-container grid">
        <div className="col-6 left-container">
          <p>{(isActive && 'Player is active') || 'Player is not active'}</p>
          <p>
            {(isConnected && 'Player is connected') ||
              'Player is not connected'}
          </p>

          {!isActive && (
            <div>
              My Accounts
              <Form onSubmit={handleConnectPlayback}>
                <FormSelectGroup
                  id="link"
                  ref={connectLinkIdRef}
                  options={jukeboxLinks?.map((link) => ({
                    label: link.email,
                    value: link.id,
                  }))}
                />
                <FormSubmit text="Connect Account" />
              </Form>
              <button className="button-solid" onClick={connectDevice}>
                Switch Playback
              </button>
            </div>
          )}
          <div className="spotify-player-desc">
            <div className="spotify-song-title">
              {currentTrack?.name ?? 'No Track Playing'}
            </div>
            <div className="spotify-song-author">
              {currentTrack?.artists.map((artist) => artist.name).join(', ') ??
                'Author Unavailable'}
            </div>
          </div>
          <div className="audio-container">
            <AudioPlayer />
          </div>
          <SpotifyPlayerInfo title="Track Info" />
          <div className="detail-container">
            <SpotifyPlayerDetail firstDetail="Explicit" secondDetail="False" />
            <SpotifyPlayerDetail
              firstDetail={'Album'}
              secondDetail={currentTrack?.album.name ?? 'Unavailable'}
            />
            <SpotifyPlayerDetail
              firstDetail="Release Date"
              secondDetail="1987"
            />
          </div>
          <div className="detail-container">
            <SpotifyPlayerDetail
              firstDetail="Recommended By"
              secondDetail="Alex Smith"
            />
            <SpotifyPlayerDetail
              firstDetail="Liked By"
              secondDetail="John Doe, Jane Reed, John Doe, Jane Reed, John Doe, Jane Reed, John Doe"
            />
            <SpotifyPlayerDetail
              firstDetail="Disliked By"
              secondDetail="Bob Jones, Richard Travis, Bob Jones, Richard Travis"
            />
          </div>
          <div className="next-track-container">
            <SpotifyPlayerInfo title="Next Tracks" />
          </div>
          {nextTracks.length > 0 && (
            <>
              <h2 className="song-queue__title">Next Up</h2>
              <ol>
                {nextTracks.map((track) => (
                  <li className="track-list-track" key={track.id}>
                    {/* TODO: Make different set of styles for track list */}
                    {!track && <p>No track specified.</p>}
                    {track && (
                      <>
                        <span className="track-list-track__preview">
                          <img
                            src={track?.album?.images[0].url}
                            alt={track.name}
                          />
                        </span>
                        <div className="track-list-track__name-group">
                          <h3 className="track-list-track__name">
                            {track.name}
                          </h3>
                          <span className="track-list-track__artists">
                            {track.artists
                              .map((artist) => artist.name)
                              .join(', ')}
                          </span>
                        </div>

                        <span className="track-list-track__info track-list-track__duration">
                          {formatDuration(track.duration_ms)}
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
        <div className="col-5 right-container">
          <div className="session-container">
            <SpotifyPlayerInfo title="Session Info" />
            <div className="detail-container">
              <SpotifyPlayerDetail
                firstDetail="Active Device"
                secondDetail="John's MacBook Air"
              />
              <SpotifyPlayerDetail
                firstDetail="This Device"
                secondDetail="John's MacBook Air"
              />
            </div>
          </div>
          <SpotifyPlayerInfo title="Connected Spotify Accounts" />
          <div className="account-container">
            {jukeboxLinks?.map((link) => (
              <SpotifyPlayerAccount key={link.id} link={link} />
            ))}
          </div>
          <div className="connect-button-container">
            {isConnected && !isActive && (
              <>
                {REACT_ENV !== 'dev' && (
                  <button
                    className="button-outlined connect-button"
                    onClick={connectDevice}
                  >
                    Connect New Account
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
