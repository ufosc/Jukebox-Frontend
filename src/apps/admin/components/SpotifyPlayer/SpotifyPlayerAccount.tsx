import SpotifyIcon from 'src/assets/img/spotify-icon.png'
import './SpotifyPlayerAccount.scss'

export const SpotifyPlayerAccount = (props: {
  account: ISpotifyAccount
  active?: boolean
  actions: {
    color?: 'success' | 'error'
    text: string
    disabled?: boolean
    onClick: (id: number) => Promise<void>
  }[]
}) => {
  const { account, active, actions } = props

  return (
    <>
      <div className="player-account">
        <div className="profile-border-container">
          <div className="profile-image-container">
            <img src={SpotifyIcon} />
          </div>
        </div>
        <div className="userInfo">
          <div className="email-container">{account.spotify_email}</div>
          <div className="attribute-container">
            <div className="account-type-container">Spotify Account</div>
            <div className="account-active-container">{active && 'Active'}</div>
          </div>
        </div>
        <div className="player-account__controls">
          {actions.map((action) => (
            <button
              disabled={action.disabled}
              key={action.text}
              className={
                action.color ? `button-text--${action.color}` : 'button-text'
              }
              onClick={(e) => action.onClick(account.id)}
            >
              {action.text}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
