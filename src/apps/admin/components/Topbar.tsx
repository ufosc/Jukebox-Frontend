import { NotificationsOutlined } from '@mui/icons-material'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  selectAllClubs,
  selectCurrentClub,
  selectHasJukeboxAux,
  selectUser,
  updateClub,
  updateMembership,
} from 'src/store'

import { Dialog } from 'src/components'
import { ClubModal } from './modals/ClubModal'
import { UserModal } from './modals/UserModal'
import './Topbar.scss'
import { NotificationModal } from './modals/NotificationModal'

export const Topbar = () => {
  const user = useSelector(selectUser)
  const clubs = useSelector(selectAllClubs)
  const currentClub = useSelector(selectCurrentClub)
  const hasAux = useSelector(selectHasJukeboxAux)

  const [showUser, setShowUser] = useState(false)
  const [showClubs, setShowClubs] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const [searchInput, setSearchInput] = useState('')

  const handleClubChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedClubId: number = Number(e.target.value)

    console.log('Set current club to:', selectedClubId)
    updateClub(selectedClubId)
    if (currentClub !== null) {
      console.log('Current club is ', currentClub.id)
    }
    if (user !== null) {
      updateMembership(selectedClubId, user.id)
    }
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleSearchSubmit = () => {
    console.log(searchInput)
  }

  const handleClubs = () => {
    setShowClubs(!showClubs)
  }

  const handleNotification = () => {
    setShowNotification(!showNotification)
  }

  const handleUser = () => {
    setShowUser(!showUser)
  }

  const closeUserModal = () => {
    setShowUser(false)
  }

  const closeNotificationModal = () => {
    setShowNotification(false)
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
        <div className="topbar__search-tracks">
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
          {hasAux && (
            <p className="color-text-role-success topbar__success">
              AUX Connected
            </p>
          )}

          <div className="form-select-club">
            <select
              className="club-selection"
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

          <div className="topbar__club" onClick={handleClubs}>
            <div className="topbar__club__selection">{currentClub?.name}</div>
          </div>
          {showClubs ? (
            <>
              <Dialog
                backdrop={true}
                defaultOpen={true}
                dismissible={true}
                changeState={setShowClubs}
                className={'overlay-dialog__club'}
              >
                <ClubModal />
              </Dialog>
            </>
          ) : (
            <></>
          )}

          <div className="topbar__notifications">
            <button onClick={handleNotification}>
              <NotificationsOutlined fontSize="large" />
            </button>
            {showNotification ? (
              <>
                <Dialog
                  backdrop={true}
                  defaultOpen={true}
                  dismissible={true}
                  changeState={setShowNotification}
                  className={'overlay-dialog__notifications'}
                >
                  <NotificationModal closeModal={closeNotificationModal} />
                </Dialog>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="topbar__profile__container">
            <button className="topbar__profile" onClick={handleUser}>
              {user && <img src={user.image} alt={user.last_name} />}
              {!user && <p>Login required.</p>}
            </button>
          </div>
          {showUser ? (
            <>
              <Dialog
                backdrop={true}
                defaultOpen={true}
                dismissible={true}
                changeState={setShowUser}
                className={'overlay-dialog__user'}
              >
                <UserModal user={user} closeModal={closeUserModal} />
              </Dialog>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {hasAux && <div className="activeAux" />}
    </>
  )
}
