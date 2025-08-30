import { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ApiClient } from 'src/api'
import { AudioPlayer } from 'src/components'
import { REACT_ENV } from 'src/config'
import { SpotifyContext } from 'src/context'
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
import './Player.scss'

export const Player = () => {
  const jukebox = useSelector(selectCurrentJukebox)
  const jukeboxLinks = useSelector(selectJukeboxLinks)
  const currentTrack = useSelector(selectCurrentTrack)
  const nextTracks = useSelector(selectNextTracks)

  const [connected, setConnected] = useState(false)

  const networkRef = useRef(ApiClient.getInstance())
  const connectLinkIdRef = useRef<HTMLSelectElement>(null)

  const {
    deviceIsActive: isActive,
    spotifyIsConnected: isConnected,
    connectDevice,
    deviceId,
  } = useContext(SpotifyContext)

  useEffect(() => {
    networkRef.current = ApiClient.getInstance()
  }, [])

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

  const initializeAccount = async () => {
    if (jukeboxLinks && jukeboxLinks.length > 0) {
      const res = await authenticateLink(jukeboxLinks[0])
      console.log(res)
    }
    setConnected(true)
  }

  useEffect(() => {
    if (isConnected) {
      setConnected(true)
    }
  }, [])

  useEffect(() => {
    connectDevice()
  }, [deviceId])

  return (
    <>
      <div className="spotify-player-title">Player</div>
      {connected ? (
        <>
          <div className="spotify-player-container grid">
            <div className="col-6 left-container">
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
                <AudioPlayer showInfo={false} />
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
                  Connected Accounts
                  <div>
                    <button className="button-solid" onClick={connectDevice}>
                      Connect to Jukebox
                    </button>
                  </div>
                  <br />
                  <div>
                    <button
                      className="button-solid"
                      onClick={handleAddNewAccount}
                    >
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
      ) : (
        <>
          <div className="spotify-player-container grid">
            <div className="col-6">
              <div className="spotify-player-header">
                Connect to Spotify to Get Started!
              </div>
              {jukeboxLinks ? (
                <button className="button-fancy" onClick={initializeAccount}>
                  Connect Account
                </button>
              ) : (
                <div>Loading...</div>
              )}
            </div>

            <div className="col-5">
              <div className="spotify-player-header">
                Connected Spotify Accounts
              </div>
              <div>Your connected accounts will show up here</div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
