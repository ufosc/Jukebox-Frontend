import { NotificationsOutlined } from '@mui/icons-material'
import type { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  selectAllClubs,
  selectAllJukeboxes,
  selectCurrentClub,
  selectCurrentJukebox,
  selectHasJukeboxAux,
  selectUser,
} from 'src/store'

import './Topbar.scss'

export const Topbar = () => {
  const user = useSelector(selectUser)
  const clubs = useSelector(selectAllClubs)
  const currentClub = useSelector(selectCurrentClub)
  const currentJukebox = useSelector(selectCurrentJukebox)
  const allJukeboxes = useSelector(selectAllJukeboxes);
  const hasAux = useSelector(selectHasJukeboxAux)

  const handleClubChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedClubId = e.target.value

    console.log('Set current club to:', selectedClubId)
  }

  const handleJukeboxChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedJukeboxId = e.target.value;


    console.log("Selected Club is: ", selectCurrentJukebox)
  }

  

  return (
    <div className="topbar">
      <div className="topbar__nav-toggle">
        <input type="checkbox" name="nav" id="nav-toggle" />
        <label htmlFor="nav-toggle" className="topbar__nav-toggle__button">
          <span className="topbar__nav-toggle__button__icon">&nbsp;</span>
        </label>
      </div>
      <div className="topbar__group-dropdown">

      <div className="topbar__group-dropdown__jukebox">
          <select
            name="current-jukebox"
            id="current-jukebox"
            onChange={handleJukeboxChange}
            defaultValue={currentClub?.id}
          >
          {!currentJukebox && <option value="">No Jukebox Selected</option>}
          {allJukeboxes.map((jukebox)=>(
             <option key={jukebox.id} value={jukebox.id}>
              {jukebox.name}
            </option>
          ))}
          </select>
          {hasAux && <p className="color-text-role-success">AUX Connected</p>}
        </div>
        <div className="form-select-control">
          <select
            name="current-club"
            id="current-club"
            onChange={handleClubChange}
            defaultValue={currentClub?.id}
          >
            {!currentClub && <option value="">No Club Selected</option>}
            {clubs.map((club) => (
              <option key={club.id} value={club.id}>
                {club.name}
              </option>
            ))}
          </select>
        </div>
        {/*
        <div className="topbar__group-dropdown__jukebox">
          {(currentJukebox && <p>{currentJukebox.name}</p>) || (
            <p className="color-text-role-error">No Jukebox Found</p>
          )}
          {hasAux && <p className="color-text-role-success">AUX Connected</p>}
        </div>
        */}   
        
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
