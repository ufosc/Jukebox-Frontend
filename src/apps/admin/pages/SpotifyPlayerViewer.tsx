import { useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { AudioPlayer, Form, FormSelectGroup, FormSubmit } from 'src/components'
import { REACT_ENV } from 'src/config'
import { SpotifyContext } from 'src/context'
import { Network } from 'src/network'
import { authenticateLink } from 'src/store'
import {
  selectCurrentJukebox,
  selectCurrentTrack,
  selectJukeboxLinks,
  selectNextTracks,
} from 'src/store/jukebox'
import { formatDuration } from 'src/utils'
import { SpotifyPlayerAccount } from '../components/SpotifyPlayer/SpotifyPlayerAccount'
import { SpotifyPlayerDetail } from '../components/SpotifyPlayer/SpotifyPlayerDetail'
import { SpotifyPlayerInfo } from '../components/SpotifyPlayer/SpotifyPlayerInfo'
import './SpotifyPlayerViewer.scss'

export const SpotifyPlayerViewer = () => {
  const jukebox = useSelector(selectCurrentJukebox)
  const jukeboxLinks = useSelector(selectJukeboxLinks)
  const currentTrack = useSelector(selectCurrentTrack)
  const nextTracks = useSelector(selectNextTracks)

  const networkRef = useRef(Network.getInstance())
  const connectLinkIdRef = useRef<HTMLSelectElement>(null)

  const {
    deviceIsActive: isActive,
    spotifyIsConnected: isConnected,
    connectDevice,
  } = useContext(SpotifyContext)

  useEffect(() => {
    networkRef.current = Network.getInstance()
  }, [])

  const linkToJukebox = async () =>{
    await handleConnectPlayback();
    console.log("Here")
    connectDevice()
  }

  const handleConnectPlayback = async () => {
    if (!connectLinkIdRef.current) return

    const link = jukeboxLinks?.find(
      (link) => link.id === +connectLinkIdRef.current!.value,
    )

    if (!link)
      throw new Error(`Link with id ${connectLinkIdRef.current} not found.`)

    await authenticateLink(link)
  }

  const handleAddNewAccount = async () => {
    const res = await networkRef.current.getSpotifyAuthRedirectUrl(jukebox?.id)

    if (res.success) {
      location.href = res.data.url
    } else {
      console.error('Error getting spotify url')
    }
  }

  return (
    <>
      <div className="spotify-player-title">Spotify Player</div>
      <div className="spotify-player-container grid">
        <div className="col-6 left-container">
          <div className="debugInfo">
            <p>{jukebox?.name}</p>
          </div>

          <div className="spotify-player-desc">
            <div className="spotify-song-title">
              {currentTrack?.track.name ?? 'No Track Playing'}
            </div>
            <div className="spotify-song-author">
              {currentTrack?.track.artists
                .map((artist) => artist.name)
                .join(', ') ?? 'Author Unavailable'}
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
              secondDetail={currentTrack?.track.album.name ?? 'Unavailable'}
            />
            <SpotifyPlayerDetail
              firstDetail="Release Date"
              secondDetail={currentTrack ? currentTrack?.track.album.release_date : '1987'}
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
                {nextTracks.map(
                  (track) =>
                    track && (
                      <li className="track-list-track" key={track.track.id}>
                        {/* TODO: Make different set of styles for track list */}
                        {!track && <p>No track specified.</p>}
                        {track && (
                          <>
                            <span className="track-list-track__preview">
                              <img
                                src={track?.track.album?.images[0].url}
                                alt={track.track.name}
                              />
                            </span>
                            <div className="track-list-track__name-group">
                              <h3 className="track-list-track__name">
                                {track.track.name}
                              </h3>
                              <span className="track-list-track__artists">
                                {track.track.artists
                                  .map((artist) => artist.name)
                                  .join(', ')}
                              </span>
                            </div>

                            <span className="track-list-track__info track-list-track__duration">
                              {formatDuration(track.track.duration_ms)}
                            </span>
                          </>
                        )}
                      </li>
                    ),
                )}
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
          {!isActive && (
            <div className="switchAccounts">
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
              <div>
                <button className="button-solid" onClick={connectDevice}>
                  Connect to Jukebox
                </button>
              </div>
              <br />
              <div>
                <button className="button-solid" onClick={handleAddNewAccount}>
                  Add Spotify Account
                </button>
              </div>
            </div>
          )}

          <div className="spotify-accounts">
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
      </div>
    </>
  )
}
