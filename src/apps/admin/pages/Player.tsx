import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { AudioPlayer } from 'src/components'
import { PlayerContext } from 'src/context'
import {
  addAccountToJukebox,
  connectNewSpotifyAccount,
  deleteAccountLinkFromJukebox,
  joinCurrentJukeSession,
  selectAccountLinks,
  selectCurrentJukeSession,
  selectCurrentJukeSessionMembership,
  selectUserAccounts,
  setActiveAccountLink,
} from 'src/store'
import { AdminHeader } from '../components/AdminHeader'
import { SpotifyPlayerAccount } from '../components/SpotifyPlayer/SpotifyPlayerAccount'
import './Player.scss'

export const Player = () => {
  const { accountConnected, connectDevice, hasAux } = useContext(PlayerContext)
  const userAccounts = useSelector(selectUserAccounts)
  const jukeboxAccounts = useSelector(selectAccountLinks)
  const jukeSession = useSelector(selectCurrentJukeSession)
  const jukeSessionMembership = useSelector(selectCurrentJukeSessionMembership)

  const [isAddingAccount, setIsAddingAccount] = useState(false)
  const handleAddAccount = async (account: ISpotifyAccount) => {
    await addAccountToJukebox(account)
    setIsAddingAccount(false)
  }

  return (
    <div className="player-page section">
      <AdminHeader title="Player" />
      <div className="row player-page__row section__main">
        <div className="player-page__col col-6">
          {accountConnected && hasAux && <AudioPlayer />}
          {jukeSession && !jukeSessionMembership && (
            <div className="player-page__section">
              <div className="font-title-md">
                Join Juke Session to manage playback
              </div>
              <button
                className="button-solid"
                onClick={() => joinCurrentJukeSession()}
              >
                Join Juke Session
              </button>
            </div>
          )}
          {accountConnected && !jukeSession && !hasAux && (
            <div className="player-page__section">
              <div className="font-title-md">
                Spotify connected, transfer playback to get started!
              </div>
              <button className="button-solid" onClick={() => connectDevice()}>
                Transfer playback
              </button>
            </div>
          )}
          {!accountConnected && (
            <div className="player-page__section">
              <div className="font-title-md">
                Connect to Spotify to Get Started!
              </div>
            </div>
          )}
        </div>
        <div className="player-page__col col-6">
          <div className="player-page__col__section">
            <h2 className="player-page__title">Connected Accounts</h2>
            {jukeboxAccounts.length === 0 && <p>No accounts connected</p>}
            <ul>
              {jukeboxAccounts?.map((accountLink) => (
                <li key={accountLink.id}>
                  <SpotifyPlayerAccount
                    account={accountLink.spotify_account}
                    active={accountLink.active}
                    actions={[
                      {
                        text: 'Activate',
                        color: 'success',
                        disabled: accountLink.active,
                        onClick: (id) => setActiveAccountLink(accountLink.id),
                      },
                      {
                        text: 'Remove',
                        color: 'error',
                        onClick: () =>
                          deleteAccountLinkFromJukebox(accountLink.id),
                      },
                    ]}
                  />
                </li>
              ))}
            </ul>
            <div className="player-page__col__section__actions">
              {(!isAddingAccount && (
                <button
                  className="button-outlined"
                  onClick={() => setIsAddingAccount(true)}
                >
                  Link New Account
                </button>
              )) || (
                <button
                  className="button-outlined"
                  onClick={() => setIsAddingAccount(false)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
          {isAddingAccount && (
            <div className="player-page__col__section">
              <h2 className="player-page__title">User Accounts</h2>
              <ul>
                {userAccounts?.map((account) => (
                  <li key={account.id}>
                    <SpotifyPlayerAccount
                      account={account}
                      actions={[
                        {
                          text: 'Connect',
                          onClick: (id) => handleAddAccount(account),
                        },
                      ]}
                    />
                  </li>
                ))}
              </ul>
              <div className="player-page__col__section__actions">
                <button
                  className="button-outlined"
                  onClick={() => connectNewSpotifyAccount()}
                >
                  Connect New Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
