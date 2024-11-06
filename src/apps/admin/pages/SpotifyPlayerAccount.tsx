import './SpotifyPlayerAccount.scss'

interface AccountProps {
  profileImage: string
  isActive: boolean
  email: string
}

export const SpotifyPlayerAccount: React.FC<AccountProps> = ({
  profileImage,
  isActive,
  email,
}) => {
  return (
    <>
      <div className="spotify-player-account">
        <div className="profile-border-container">
          <div className="profile-image-container">
            <img src={profileImage} />
          </div>
        </div>
        <div className="userInfo">
          <div className="email-container">{email}</div>
          <div className="attribute-container">
            <div className="account-type-container">Spotify Account</div>
            <div className="account-active-container">
              {isActive && 'Active'}
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
