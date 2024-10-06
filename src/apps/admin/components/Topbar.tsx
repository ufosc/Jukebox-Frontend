import type { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import { selectAllClubs, selectCurrentClub, selectUser } from 'src/store'

import './Topbar.scss'

export const Topbar = () => {
  const user = useSelector(selectUser)
  const clubs = useSelector(selectAllClubs)
  const currentClub = useSelector(selectCurrentClub)

  const handleClubChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedClubId = e.target.value

    console.log('Set current club to:', selectedClubId)
  }

  return (
    <div className="topbar">
      <div className="topbar__search">
        <select
          name="current-club"
          id="current-club"
          onChange={handleClubChange}
        >
          <option value="">{currentClub?.name ?? 'No Club Selected'}</option>
          {clubs
            .filter((club) => club.id !== currentClub?.id)
            .map((club) => (
              <option key={club.id} value={club.id}>
                {club.name}
              </option>
            ))}
        </select>
      </div>
      <div className="topbar__profile">
        {user && <img src={user.image} alt={user.lastName} />}
        {!user && <p>Login required.</p>}
      </div>
    </div>
  )
}
