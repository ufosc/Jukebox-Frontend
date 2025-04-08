import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SpotifyContext } from 'src/context'
import { logoutUser, selectAllClubs, selectUser } from 'src/store'
import { selectAllJukeboxes, selectCurrentJukebox } from 'src/store/jukebox'

export const Settings = () => {
  const clubs = useSelector(selectAllClubs)
  const user = useSelector(selectUser)
  const jukeboxes = useSelector(selectAllJukeboxes)
  const currentJukebox = useSelector(selectCurrentJukebox)
  const navigate = useNavigate()

  const { connectDevice } = useContext(SpotifyContext)

  const handleLogout = async () => {
    await logoutUser()
    // navigate('/auth/login')
  }

  return (
    <div>
      <section>
        <h2>Current User</h2>
        <ul>
          <li>
            Name: {user?.first_name} {user?.last_name}
          </li>
          <li>Email: {user?.email}</li>
          <li>Username: {user?.username}</li>
        </ul>

        <button onClick={handleLogout}>Logout</button>
      </section>
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
