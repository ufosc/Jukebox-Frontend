import { useState } from 'react'
import './SpotifyDetail.scss'

export const SpotifyLinkAccount = (props: { link: ISpotifyAccount }) => {
  const { link } = props

  const [isSelected, setIsSelected] = useState(false)

  const changeSelected = () => {
    setIsSelected(!isSelected)
  }

  return (
    <>
      <div onClick={changeSelected}>
        {isSelected ? (
          <>
            <div className="spotify-container-selected">
              <div className="spotify-link-account">
                <div className="profile-border-container">
                  <div className="profile-image-container">
                    <img src={'#'} />
                  </div>
                </div>
                <div className="userInfo">
                  <div className="email-container">{link.spotify_email}</div>
                  <div className="attribute-container">
                    <div className="account-type-container">
                      Spotify Account
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="spotify-container-unselected">
              <div className="spotify-link-account">
                <div className="profile-border-container">
                  <div className="profile-image-container">
                    <img src={'#'} />
                  </div>
                </div>
                <div className="userInfo">
                  <div className="email-container">{link.spotify_email}</div>
                  <div className="attribute-container">
                    <div className="account-type-container">
                      Spotify Account
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
