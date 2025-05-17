import { NotificationsOutlined } from '@mui/icons-material'
import type { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  fetchJukebox,
  selectAllClubs,
  selectAllJukeboxes,
  selectCurrentClub,
  selectCurrentJukebox,
  selectHasJukeboxAux,
  selectUser,
  updateClub,
} from 'src/store'

import './Topbar.scss'
import { thunkFetchClubInfo } from 'src/store/club/clubThunks'

export const Topbar = () => {
  const user = useSelector(selectUser)
  const clubs = useSelector(selectAllClubs)
  const currentClub = useSelector(selectCurrentClub)
  const currentJukebox = useSelector(selectCurrentJukebox)
  const allJukeboxes = useSelector(selectAllJukeboxes)
  const hasAux = useSelector(selectHasJukeboxAux)

  const handleClubChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedClubId: number = Number(e.target.value)

    console.log('Set current club to:', selectedClubId)
    updateClub(selectedClubId)
    if (currentClub !== null) {
      console.log('Current club is ', currentClub.id)
    }
  }

  const handleJukeboxChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedJukeboxId: number = Number(e.target.value)
    fetchJukebox(selectedJukeboxId)

    if (currentJukebox !== null) {
      console.log('Selected JBX is: ', currentJukebox.id)
    }
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
            {allJukeboxes.map((jukebox) => (
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
