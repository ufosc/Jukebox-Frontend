import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser, selectAllClubs, selectUser } from 'src/store'
import { selectAllJukeboxes, selectCurrentJukebox } from 'src/store/jukebox'

import { PlayerContext } from 'src/context'
import './Settings.scss'

export const Settings = () => {
  const clubs = useSelector(selectAllClubs)
  const user = useSelector(selectUser)
  const jukeboxes = useSelector(selectAllJukeboxes)
  const currentJukebox = useSelector(selectCurrentJukebox)
  const navigate = useNavigate()

  const { connectDevice } = useContext(PlayerContext)

  const handleLogout = async () => {
    await logoutUser()
    // navigate('/auth/login')
  }

  const handleDelete = async () => {
    console.log('deleted account')
  }

  return (
    <div>
      <div className="">
        <h2 className="settings-title">Settings</h2>

        <div className="grid">
          <div className="col-7">
            <div className="settings-category">
              <div className="outline">
                <div className="name">Name</div>
                <button>Edit</button>
              </div>

              <div className="details">{user?.profile.name}</div>
            </div>

            <div className="settings-category">
              <div className="outline">
                <div className="name">Email</div>
                <button>Edit</button>
              </div>

              <div className="details">{user?.email}</div>
            </div>

            <div className="settings-category">
              <div className="outline">
                <div className="name">Username</div>
                <button>Edit</button>
              </div>

              <div className="details">{user?.username}</div>
            </div>
          </div>

          <section className="col-1 spacer"></section>

          <section className="col-4">
            <div className="authentication-title">Password</div>
            <div className="password-container">
              <button className="button-fancy" onClick={handleLogout}>
                Change Password
              </button>
              <div className="description">
                Password last changed on May 23, 2025
              </div>
            </div>
            <div className="logout-container">
              <button
                className="button-fancy logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="button-outlined delete-btn"
                onClick={handleDelete}
              >
                Delete Account
              </button>
            </div>
          </section>
        </div>
      </div>

      <br />

      <section>
        <h2>Clubs</h2>
        <ul>
          {clubs.map((club) => (
            <li key={club.id}>{club.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Jukeboxes</h2>
        <ul>
          {jukeboxes.map((jbx) => (
            <li key={jbx.id}>
              {jbx.name}
              {jbx.id === currentJukebox?.id ? '(active)' : ''} (
              {clubs.find((club) => +club.id === +jbx.club_id)?.name ??
                'No Club Found'}
              )
            </li>
          ))}
        </ul>
        {currentJukebox && (
          <button onClick={connectDevice}>Transfer Playback</button>
        )}
      </section>
    </div>
  )
}
