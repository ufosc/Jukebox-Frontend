import { NotificationsOutlined } from '@mui/icons-material'
import type { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import { selectAllClubs, selectCurrentClub, selectUser } from 'src/store'

import './Topbar.scss'

export const Topbar = () => {
  const user = useSelector(selectUser)
  const clubs = useSelector(selectAllClubs)
  const currentClub = useSelector(selectCurrentClub)
  // const jukeboxes = useSelector()

  const handleClubChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedClubId = e.target.value

    console.log('Set current club to:', selectedClubId)
  }

  return (
    <div className="topbar">
      <div className="topbar__group-dropdown">
        <select
          name="current-club"
          id="current-club"
          onChange={handleClubChange}
        >
          {!currentClub && <option value="">No Club Selected</option>}
          {clubs.map((club) => (
            <option
              key={club.id}
              value={club.id}
              selected={club.id === currentClub?.id}
            >
              {club.name}
            </option>
          ))}
        </select>
      </div>
      <div className="topbar__user-details">
        <div className="topbar__notifications">
          <button>
            <NotificationsOutlined fontSize="large" />
          </button>
        </div>
        <button className="topbar__profile">
          {user && <img src={user.image} alt={user.last_name} />}
          {!user && <p>Login required.</p>}
        </button>
      </div>
    </div>
  )
}
