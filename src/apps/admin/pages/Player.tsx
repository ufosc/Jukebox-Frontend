import { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ApiClient } from 'src/api'
import { AudioPlayer } from 'src/components'
import { REACT_ENV } from 'src/config'
import { PlayerContext } from 'src/context'
import { authenticateLink } from 'src/store'
import {
  selectAccountLinks,
  selectCurrentJukebox,
  selectNextTracks,
} from 'src/store/jukebox'
import { SpotifyPlayerAccount } from '../components/SpotifyPlayer/SpotifyPlayerAccount'
import { SpotifyPlayerDetail } from '../components/SpotifyPlayer/SpotifyPlayerDetail'
import { SpotifyPlayerInfo } from '../components/SpotifyPlayer/SpotifyPlayerInfo'
import './Player.scss'

export const Player = () => {
  const jukebox = useSelector(selectCurrentJukebox)
  const jukeboxLinks = useSelector(selectAccountLinks)
  const nextTracks = useSelector(selectNextTracks)

  const [connected, setConnected] = useState(false)

  const networkRef = useRef(ApiClient.getInstance())
  const connectLinkIdRef = useRef<HTMLSelectElement>(null)
  const { playerState } = useContext(PlayerContext)

  // const {
  //   deviceIsActive: isActive,
  //   spotifyIsConnected: isConnected,
  //   connectDevice,
  //   deviceId,
  // } = useContext(SpotifyPlayerContext)

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

  // useEffect(() => {
  //   if (isConnected) {
  //     setConnected(true)
  //   }
  // }, [])

  // useEffect(() => {
  //   connectDevice()
  // }, [deviceId])

  return (
    <>
      <div className="spotify-player-title">Player</div>
      {connected && (
        <>
          <div className="spotify-player-container grid">
            <div className="col-6 left-container">
              <div className="audio-container">
                <AudioPlayer />
              </div>
              <div className="next-track-container">
                <SpotifyPlayerInfo title="Next Tracks" />
              </div>
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
              {/* {!isActive && (
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
              )} */}

              <div className="spotify-accounts">
                <SpotifyPlayerInfo title="Connected Spotify Accounts" />
                <div className="account-container">
                  {jukeboxLinks?.map((link) => (
                    <SpotifyPlayerAccount key={link.id} link={link} />
                  ))}
                </div>
                {/* <div className="connect-button-container">
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
                </div> */}
              </div>
            </div>
          </div>
        </>
      )}
      {!connected && (
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
