import { useEffect, useState } from 'react'
import { authenticateLink } from 'src/store'
import './SpotifyPlayerAccount.scss'

export const SpotifyPlayerAccount = (props: { link: IJukeboxLink }) => {
  const { link } = props

  const [activeLink, setActiveLink] = useState(link.active)
  const [type, setType] = useState<string>(link.type)

  const handleTransferPlayback = async () => {
    await authenticateLink(link)
  }

  useEffect(() => {
    if (link.type === 'spotify') {
      setType('Spotify')
    }
  }, [link])

  return (
    <>
      {activeLink ? (
        <>
          <div className="player-account player-account__active">
            <div className="profile-border-container">
              <div className="profile-image-container">
                <img src={'#'} />
              </div>
            </div>
            <div className="userInfo">
              <div className="email-container">{link.email}</div>
              <div className="attribute-container">
                <div className="account-type-container">{type} Account</div>
                <div className="account-active-container">
                  {link.active && 'Active'}
                </div>
              </div>
            </div>
            <div className="player-account__controls">
              <button className="button-text--disabled player-account__controls__active">
                Activate
              </button>
              <button className="button-text">Remove</button>
            </div>
          </div>
        </>
      ) : (
        <div className="player-account">
          <div className="profile-border-container">
            <div className="profile-image-container">
              <img src={'#'} />
            </div>
          </div>
          <div className="userInfo">
            <div className="email-container">{link.email}</div>
            <div className="attribute-container">
              <div className="account-type-container">{type} Account</div>
              <div className="account-active-container">
                {link.active && 'Active'}
              </div>
            </div>
          </div>
          <div className="player-account__controls">
            <button
              className="button-text--success"
              onClick={handleTransferPlayback}
            >
              Activate
            </button>
            <button className="button-text">Remove</button>
          </div>
        </div>
      )}
    </>
  )
}
