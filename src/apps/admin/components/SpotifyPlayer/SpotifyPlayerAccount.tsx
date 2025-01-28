import './SpotifyPlayerAccount.scss'

export const SpotifyPlayerAccount = (props: { link: IJukeboxLink }) => {
  const { link } = props

  return (
    <>
      <div className="spotify-player-account">
        <div className="profile-border-container">
          <div className="profile-image-container">
            <img src={'#'} />
          </div>
        </div>
        <div className="userInfo">
          <div className="email-container">{link.email}</div>
          <div className="attribute-container">
            <div className="account-type-container">Spotify Account</div>
            <div className="account-active-container">
              {link.active && 'Active'}
            </div>
          </div>
        </div>
        <div className="account-remove-container">
          <button className="account-remove-button button-text">Remove</button>
        </div>
      </div>
    </>
  )
}
