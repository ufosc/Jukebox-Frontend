import { NotificationsOutlined } from '@mui/icons-material'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  selectAllClubs,
  selectCurrentClub,
  selectCurrentJukebox,
  selectHasJukeboxAux,
  selectUser,
  updateClub,
  updateMembership,
} from 'src/store'

import { useNavigate } from 'react-router-dom'
import { Dialog } from 'src/components'
import { Network } from 'src/network'
import { debounce } from 'src/utils'
import { ClubModal } from './modals/ClubModal'
import { NotificationModal } from './modals/NotificationModal'
import { SearchModal } from './modals/SearchModal'
import { UserModal } from './modals/UserModal'
import './Topbar.scss'

export const Topbar = () => {
  const user = useSelector(selectUser)
  const clubs = useSelector(selectAllClubs)
  const currentClub = useSelector(selectCurrentClub)
  const jukebox = useSelector(selectCurrentJukebox)
  const hasAux = useSelector(selectHasJukeboxAux)
  const network = Network.getInstance()

  const [showUser, setShowUser] = useState(false)
  const [showClubs, setShowClubs] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [searchList, setSearchList] = useState<ITrackDetails[]>([])

  const [searchActive, setSearchActive] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const onFocus = () => {
    if (searchInput.trim() !== '') {
      setSearchActive(true)
      setShowSearch(true)
    }
  }
  const onBlur = () => setSearchActive(false)

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
    const searchEntry = e.target.value
    setSearchInput(searchEntry)
    //Only searches if search isn't empty
    if (searchEntry.trim() !== '') {
      debounce(async () => {
        console.log('Searching for ', searchInput)
        e.preventDefault()

        if (jukebox !== null) {
          // Only Searches using track name currently
          const tracksResult = await network.getTracks(
            jukebox.id,
            searchInput,
            '',
            '',
          )
          console.log(tracksResult)
          if (tracksResult.success) {
            console.log(tracksResult.data.tracks.items)
            //Modify logic for Modal
            setSearchList(tracksResult.data.tracks.items)
          }
        } else {
          console.log('Jukebox is not connected')
        }
      })
      setSearchActive(true)
      setShowSearch(true)
    }
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

  const navigate = useNavigate()
  const handleSearchSubmit = async (e: any) => {
    e.preventDefault()
    const searchPath = '/dashboard/music/search'
    if (jukebox) {
      const response = await network.getTracks(jukebox.id, searchInput, '', '')

      const query = {
        trackName: searchInput,
        albumName: '',
        artistName: '',
      }

      navigate(searchPath, {
        state: { searchedTracks: response, query: query, needSearch: true },
      })
    }
    setSearchActive(false)
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
              autoComplete="off"
              onFocus={onFocus}
              onBlur={onBlur}
            ></input>
          </form>
          {searchActive || showSearch ? (
            <>
              <Dialog
                backdrop={true}
                defaultOpen={true}
                dismissible={true}
                changeState={setShowSearch}
                className={'overlay-dialog__search'}
              >
                <SearchModal
                  tracks={searchList}
                  searchQuery={{
                    trackName: searchInput,
                    albumName: '',
                    artistName: ' ',
                  }}
                  changeState={setShowSearch}
                />
              </Dialog>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="topbar__user-details">
          {hasAux && (
            <p className="color-text-role-success topbar__success">
              AUX Connected
            </p>
          )}

          {/* 
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
          */}

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

          {/*<div className="topbar__notifications">
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
          </div>*/}
          <div className="topbar__profile__container">
            <button className="topbar__profile" onClick={handleUser}>
              {user && (
                <img
                  src={user?.profile?.image ?? undefined}
                  alt={user.last_name}
                />
              )}
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
