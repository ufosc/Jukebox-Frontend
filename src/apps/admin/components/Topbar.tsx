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
  updateMembership,
} from 'src/store'

import './Topbar.scss'
import { thunkFetchClubInfo } from 'src/store/club/clubThunks'
import { Dialog } from 'src/components'
import { UserModal } from './modals/UserModal'

export const Topbar = () => {
  const user = useSelector(selectUser)
  const clubs = useSelector(selectAllClubs)
  const currentClub = useSelector(selectCurrentClub)
  const hasAux = useSelector(selectHasJukeboxAux)

  const [showUser, setShowUser] = useState(false)

  const [searchInput, setSearchInput] = useState('')

  const handleClubChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedClubId: number = Number(e.target.value)

    console.log('Set current club to:', selectedClubId)
    updateClub(selectedClubId)
    if (currentClub !== null) {
      console.log('Current club is ', currentClub.id)
    }
    if(user !== null) {
      updateMembership(selectedClubId, user.id)
    }
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleSearchSubmit = () => {

    console.log(searchInput)
  }
  
  const handleUser = () =>{ 
    console.log("Clicked User!")
    setShowUser(!showUser)
  }

  const closeUserModal = () => {
    setShowUser(false)
  }

  return (
    <>
    <div className="topbar">
      <div className="topbar__nav-toggle">
        <input type="checkbox" name="nav" id="nav-toggle" />
        <label htmlFor="nav-toggle" className="topbar__nav-toggle__button">
          <span className="topbar__nav-toggle__button__icon">&nbsp;</span>
        </label>
      </div>
      <div className="topbar__search-tracks" >
        <form onSubmit={handleSearchSubmit}>
          <input
              className="search-tracks-field"
              type="text"
              name="track"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search Tracks"
            ></input>
        </form>
      </div>
      <div className="topbar__user-details">
        {hasAux && <p className="color-text-role-success topbar__success">AUX Connected</p>}

        <div className="form-select-club">
          <select
            className='club-selection'
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

        <div className="topbar__notifications">
          <button>
            <NotificationsOutlined fontSize="large" />
          </button>
        </div>
        <button className="topbar__profile" onClick={handleUser}>
          {user && <img src={user.image} alt={user.last_name} />}
          {!user && <p>Login required.</p>}
        </button>
        {showUser ? (<>
        
          <Dialog
          
          backdrop={true}
          defaultOpen={true}
          dismissible={true}
          changeState={setShowUser}
          className={'overlay-dialog__user'}
          >
                <UserModal user={user} closeModal={closeUserModal} />

          </Dialog>
          
          </>) : (<></>)}
      </div>
    </div>
    {hasAux && <div className='activeAux'/>}
    </>
  )
}
